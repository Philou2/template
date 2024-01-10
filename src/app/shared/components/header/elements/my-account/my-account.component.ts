import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../../../auth/services/auth.service';
import {environment} from '../../../../../../environments/environment';
import {UserService} from '../../../../../components/security/services/user.service';
import {
  UserPasswordUpdateComponent
} from '../../../../../components/security/components/user/user-password-update/user-password-update.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  public user: string;
  public userName: string;
  public userProfile: string;
  public profileImg: 'assets/images/dashboard/profile.jpg';
  private baseUrl = environment.apiBaseUrl.replace('/api', '');
  public userPicture: string;


  constructor(public router: Router, public authService: AuthService, private modalService: NgbModal, public userService: UserService) {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.userName = this.user['firstname'] + ' ' + this.user['lastname'];
      this.userPicture = this.baseUrl + '/uploads/' + this.user['picture'];
      this.userProfile = this.user['profile'];
      console.log(this.userPicture);

    } else {
    }
  }

  ngOnInit() {}

  logoutFunc() {
    this.authService.doLogout();
  }

  updatePassword(data: any): void{
    console.log(data);
    const modalRef = this.modalService.open(UserPasswordUpdateComponent,
        {
          // centered: true,
          // backdrop: 'static'
        }
    );
    modalRef.componentInstance.data = data;

  }

}
