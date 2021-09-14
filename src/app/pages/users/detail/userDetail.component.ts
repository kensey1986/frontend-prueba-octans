import { UserService } from './../service/user.service';
import { OnInit, Component, Input  } from '@angular/core';
import { User } from '../interface/user';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';




@Component({
    selector: 'app-user',
    templateUrl: './userDetail.component.html',
    styleUrls: ['./userDetail.component.css']
    
  })

  export class UserDetailComponent implements OnInit {
   user?:User;
    ngOnInit(): void {
        this.cargarUsuario();
    }
    constructor(
        public  userService: UserService,
        public  activatedRoute: ActivatedRoute,
        public  router: Router,
      ){}

      cargarUsuario() {
        this.activatedRoute.paramMap.subscribe(params => {
          const id = params.get('id');
          this.userService.getUser(id)
          .subscribe(
            user => this.user = user);
        });
      }
      eliminarUsuario(id: number | undefined) {
        this.userService.delete(id)
        .subscribe(response => {
          Swal.fire(`Borrado`, response.mensaje, 'success');
          this.router.navigate(['/users'])
        },
        err => {
          Swal.fire(`Error`, err, 'error')
          console.error(err);
        });
       
      }
  }