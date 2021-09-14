import { UserService } from './service/user.service';
import { User } from './interface/user';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  
})
export class UserComponent implements OnInit {
  public formGroup: FormGroup | undefined;
  
  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'rol', 'estado',  'editar', 'eliminar'];
  dataSource = new MatTableDataSource();
  activar = true;

  user: User = new User();
  titulo: string =' lista de Usuarios';
  constructor(
    public  userService: UserService,
    
  ){}
  ngOnInit(): void {
    this.cargarListadoUsuariosCompleto();
    
   
    
    throw new Error('Method not implemented.');
  }

  
  
  cargarListadoUsuariosCompleto() {
    this.userService.getListadoUsuarios()
    .subscribe(datosTabla => {this.dataSource.data = datosTabla; 
                              if (datosTabla.length > 0 ) {
                                this.activar = false;
                            }});
  }

  eliminarUsuario(id: number) {
    this.userService.delete(id)
    .subscribe(response => {
      Swal.fire(`Borrado`, response.mensaje, 'success')
      this.cargarListadoUsuariosCompleto();
    },
    err => {
      Swal.fire(`Error`, err, 'error')
      console.error(err);
    });
    this.cargarListadoUsuariosCompleto();
  }

  
  buscar(nombre: any) {
    this.userService.filtrarUsuario(nombre)
    .subscribe( response => {
      if (response.length>0) {
         this.dataSource.data = response
        
      } else {
        Swal.fire(`${nombre}`, `. No Encontrado en la base de datos `, 'info')
        
      }
    }      );
  }
}
