import { UserService } from './../service/user.service';
import { OnInit, Component, Input  } from '@angular/core';
import { User } from '../interface/user';
import {RouterModule} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



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
      ){}

      cargarUsuario() {
        this.activatedRoute.paramMap.subscribe(params => {
          const id = params.get('id');
          this.userService.getUser(id)
          .subscribe(
            user => {this.user = user,
                       console.log('============usuario========================');
                       console.log(this.user);
                       console.log('====================================');
            });
        });
      }
  }