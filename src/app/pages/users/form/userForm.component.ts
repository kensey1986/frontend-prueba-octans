import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import Swal from 'sweetalert2';

// import { Sucursal } from ';
import { Component, OnInit, ɵReflectionCapabilities } from '@angular/core';
// import { Region } from '../../regiones/interfaces/region';
// import { RegionService } from '../../regiones/services/region.service';
import { Router, ActivatedRoute } from '@angular/router';

// import { LoadingService } from '../../generales/services/loading.service';
import {  Validators,
  FormBuilder, FormGroup} from '@angular/forms';
  import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-user',
  templateUrl: './userForm.component.html'
})
export class UserFormComponent implements OnInit {

  disableSelect = new FormControl(false);
  hide = true;
  minDate = new Date(1930, 1, 1);
  maxDate = new Date();
//   user?: User ;
 user: User = new User();
//   regiones: Region[];
  titulo = 'Crear Usuarios';
  errores?: string[];
  roles?: string [];
  rolDisplay?: string;
  rolSelect?: string[];
  estadoDisplay = 'DESACTIVADO';
  estadoSelect =  ['ACTIVO', 'DESACTIVADO'];
 
  constructor(
    public  userService: UserService,
    public  router: Router,
    // public  regionService: RegionService,
    public  activatedRoute: ActivatedRoute,
    // public loadingService: LoadingService,
    public formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    // this.loadingService.abrirModal();
    this.cargarUser();
    this.rolSelect = ['ADMINISTRADOR', 'USUARIO'];
    this.estadoSelect =  ['ACTIVO', 'DESACTIVADO'];
    // this.regionService.getRegionLista().subscribe(regiones => this.regiones = regiones);
  }

  cargarUser() {
    this.activatedRoute.params.subscribe(
      params => {
        const id = params.id;
        if (id) {
          this.userService.getUser(id).subscribe(
            user =>  {(this.user = user,
              this.estadoUsuarios(user.estado || false) );
                      this.asignarDatosFormulario();
          });
        }
      });
    // this.loadingService.cerrarModal();
  }

 
  estadoUsuarios(estado: boolean) {
    if (estado === true) {
      this.estadoDisplay = 'ACTIVO';
      this.estadoSelect = ['ACTIVO', 'DESACTIVADO'];
    } else {
      this.rolDisplay = 'DESACTIVADO';
      this.estadoSelect = ['DESACTIVADO', 'ACTIVO'];
    }
  }

  public create(): void {
    // this.loadingService.abrirModal();
    console.log('====================================');
    console.log('llego a crear');
    console.log('====================================');
    this.asignarDatosParaGuardar();
    console.log(this.user);
    // this.user.roles = null;
    this.userService.create(this.user).subscribe(
      () => {
        this.router.navigate(['/users']),
        Swal.fire(`Nuevo Usuario`, `${this.user.nombre}. Creado con exito `, 'success')
        // this.loadingService.cerrarModal();
      },
      err => {
        this.errores = err.error.errors as string[];
        // this.loadingService.cerrarModal();
      }
    );
  }
/** 
  update(): void {
    this.loadingService.abrirModal();
    this.user.facturas = null;
    this.asignarDatosParaGuardar();
    console.log(this.user);
    this.userService.update(this.user)
    .subscribe(
      () => {
        this.router.navigate(['/users']),
        Swal.fire({
          type: 'success',
          title: `Usuario`,
          text: `${this.user.nombre}`,
          footer: `Actualizado con Exito!`
        });
        this.loadingService.cerrarModal();
      },
      err => {
        this.errores = err.error.errors as string[];
        this.loadingService.cerrarModal();
      }
    );
  }
*/
//   public compararRegion(o1: Region, o2: Region): boolean {
//     if (o1 === undefined && o2 === undefined) {
//       return true;
//     }
//     return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
//   }

  // tratamiento a formulario

  
  formularioCreado: FormGroup = this.formBuilder.group({
    nombre: ['pepe', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])],
    // rol: ['', Validators.required],
    estado: ['algo', Validators.required],
  });
  
  asignarDatosFormulario() {
    console.log('====================================');
    console.log('llegoa  asgirnar datos');
    console.log('====================================');
    this.formularioCreado?.setValue({
      nombre: this.user.nombre,
      rol: this.user.rol,
      estado: this.estadoDisplay,
    });
  }

  asignarDatosParaGuardar() {
    this.user.nombre = this.formularioCreado?.value.nombre,
    this.user.estado = this.formularioCreado?.value.estado
    if (this.formularioCreado?.value.estado === 'ACTIVO') {
      this.user.estado = true;
    } else {
      this.user.estado = false;
    }
  }

}