import { Rol } from './../interface/rol';
import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import {  Validators,
  FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './userForm.component.html'
})
export class UserFormComponent implements OnInit {

  
  hide = true;
  minDate = new Date(1930, 1, 1);
  maxDate = new Date();
//   user?: User ;
 user: User = new User();
//   regiones: Region[];
  titulo = 'Crear Usuarios';
  errores?: string[];
  roles?: Rol [] ;
  rolDisplay?: string;
  rolSelect?: string[];
  estadoDisplay = 'DESACTIVADO';
  estadoSelect =  ['ACTIVO', 'DESACTIVADO'];
 
  constructor(
    public  userService: UserService,
    public  router: Router,
    public  activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.cargarUser();
    this.rolSelect = ['ADMINISTRADOR', 'USUARIO'];
    this.estadoSelect =  ['ACTIVO', 'DESACTIVADO'];
    this.userService.getListadoRoles().subscribe(rol => this.roles = rol)
  }

  formularioCreado: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])],
    roles: ['', Validators.required],
    estado: ['', Validators.required],
  });

  cargarUser() {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params.id;
        if (id) {
          this.userService.getUser(id).subscribe(
            user =>  {(this.user = user,
              this.estadoUsuarios(user.estado || false) );
              this.rolUsuarios(user.id || 0);
                      this.asignarDatosFormulario();
          });
        }
      });
  }

 
  estadoUsuarios(estado: boolean) {
    if (estado === true) {
      this.estadoDisplay = 'ACTIVO';
      this.estadoSelect = ['ACTIVO', 'DESACTIVADO'];
    } else {
      this.estadoDisplay = 'DESACTIVADO';
      this.estadoSelect = ['DESACTIVADO', 'ACTIVO'];
    }
  }

  rolUsuarios(id: number) {
    if (id === 1) {
      this.rolDisplay = 'ADMINISTRADOR';
      this.rolSelect = ['AUDITOR', 'AUXILIAR'];
    } else if ( id === 2) {
      this.rolDisplay = 'AUDITOR';
      this.rolSelect = ['ADMINISTRADOR', 'AUXILIAR'];
    } else {
      this.rolDisplay = 'AUXILIAR';
      this.rolSelect = ['ADMINISTRADOR', 'AUDITOR'];
    }
  }

  public create(): void {
    
    this.userService.create(this.user).subscribe(
      () => {
        this.router.navigate(['/users']),
        Swal.fire(`Nuevo Usuario`, `${this.user.nombre}. Creado con exito `, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  update(): void {
    this.asignarDatosParaGuardar();
    this.userService.update(this.user)
    .subscribe(
      () => {
        this.router.navigate(['/users']),
        Swal.fire(`Usuario Actualizado`, `${this.user.nombre}. Actualizada con exito `, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  
  // tratamiento a formulario

  
 
  
  asignarDatosFormulario() {
    this.formularioCreado?.setValue({
      nombre: this.user.nombre,
      roles: this.rolDisplay,
      estado: this.estadoDisplay,
    });
  }

  asignarDatosParaGuardar() {
    this.user.nombre = this.formularioCreado?.value.nombre,
    this.user.estado = this.formularioCreado?.value.estado;
    const idRol = this.formularioCreado?.value.roles;
    if (idRol === 1 || idRol === 'ADMINISTRADOR') {
      this.user.rol = {
        "id": 1,
        "nombre": "ADMINISTRADOR"
      }
    } else if (idRol === 2 || idRol === 'AUDITOR' ) {
      this.user.rol = {
        "id": 2,
        "nombre": "AUDITOR"
      }
    } else {
      this.user.rol = {
        "id": 3,
        "nombre": "AUXILIAR"
      }
    }
    if (this.formularioCreado?.value.estado === 'ACTIVO') {
      this.user.estado = true;
    } else {
      this.user.estado = false;
    }
  }
  public compararRol(o1: Rol, o2: Rol): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}