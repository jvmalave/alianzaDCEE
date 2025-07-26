import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { AuthService } from '../../auth/_services/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users:any = [];
  currentRol: any = null;

  isLoading$:any;
  search:any = "";

  constructor(
    public _userService:UsersService,
    public modalService: NgbModal,
    private _authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.allUsers();
    this.currentRol = this._authService.user.rol;
    console.log("ROLonUSER",this.currentRol)
  }

  allUsers(){
    this._userService.allUsers(this.search).subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.users;
    })
  }


  refresh(){
   this.search = "";
   this.allUsers();

  }

  openCreate(){
    const modalRef = this.modalService.open(AddUsersComponent, {centered:true,size: 'md'});
    modalRef.result.then(
      () => {

      },() => {

      }
    );
    modalRef.componentInstance.UserC.subscribe((resp:any) => {
      console.log(resp);
      this.users.unshift(resp);
    })


  }

  editUser(user:any){
    const modalRef = this.modalService.open(EditUsersComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },() => {

      }
    );
    modalRef.componentInstance.UserE.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(item => item._id == resp._id);
      if(INDEX != -1){
        this.users[INDEX] = resp;
      }
    })
  }

  delete(user:any){
    const modalRef = this.modalService.open(DeleteUserComponent, {centered:true,size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },() => {

      }
    );
    modalRef.componentInstance.UserD.subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(item => item._id == user._id);
      if(INDEX != -1){
        this.users.splice(INDEX,1);
      }
    })
  }
}
