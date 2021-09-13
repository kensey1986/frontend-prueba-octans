import { UserService } from './service/user.service';
import { User } from './interface/user';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  
})
export class UserComponent implements OnInit {

  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  displayedColumns: string[] = ['id', 'nombre', 'rol', 'estado',  'editar', 'eliminar'];
  dataSource = new MatTableDataSource();
  activar = true;

  // users: User[];
  // paginador: any;
  // userSelecionado: User;
  // tipoUsuario: string;
  // link = '/users/page';
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
    .subscribe(datosTabla => {this.dataSource.data = datosTabla; console.log(datosTabla);
                              if (datosTabla.length > 0 ) {
                                this.activar = false;
                                // this.loadingService.cerrarModal();
                            }});
  }

  eliminarUsuario(id: number) {
    console.log('====================================');
    console.log(' trae id');
    console.log(id)
    console.log('====================================');
    const resp=this.userService.delete(id)
    console.log(resp)
  }
}
