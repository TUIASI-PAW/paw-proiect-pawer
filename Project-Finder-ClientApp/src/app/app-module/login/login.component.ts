import { ReadUser } from './../../models/read-models/read-users';
import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import { WriteUser } from './../../models/write-models/write-user';
import { HttpService } from '../../services/http-service/http.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSuccessfullCreated = false;
  isCreateViewExpandable = false;
  username: string;
  password: string;
  currentPassword: string;
  email: string;
  message: string;

  constructor(
    private httpService: HttpService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.clearFields();
    this.message = '';
  }

  changePageView() {
    this.isCreateViewExpandable = !this.isCreateViewExpandable;
    this.clearFields();
    this.message = '';
  }

  logIn() {
    if (this.username.length > 0 && this.password.length > 0) {
      const writeUser: WriteUser = {
        email: null,
        username: this.username,
        password: this.password,
      };
      this.httpService.post<WriteUser>('users/signin', writeUser).subscribe(
        (data: ReadUser) => {
          const readUser: ReadUser = {
            id: data.id,
            username: data.username,
            email: data.email,
            token: data.token,
          };
          this.tokenStorageService.saveToken(readUser.token);
          this.tokenStorageService.saveUser(readUser);
          this.clearFields();
          this.message = '';
        },
        () => {
          this.message = 'Username or password is wrong!';
        }
      );
    } else {
      let error = 'Fields: ';
      if (this.username.length === 0) {
        error += 'username';
      }
      if (this.password.length === 0) {
        if (this.username.length === 0) {
          error += ' and';
        }
        error += ' password';
      }
      error += ' should not be blank!';
      this.message = error;
    }
  }

  createUser() {
    if (
      this.password.length > 0 &&
      this.username.length > 0 &&
      this.email.length > 0 &&
      this.currentPassword.length > 0
    ) {
      if (this.password === this.currentPassword) {
        const writeUser: WriteUser = {
          email: this.email,
          username: this.username,
          password: this.password,
        };
        this.httpService.post<WriteUser>('users/signup', writeUser).subscribe(
          () => {},
          (data: HttpErrorResponse) => {
            this.message = data.error;
          }
        );
      } else {
        this.message = 'Password and confirmation does not match!';
      }
    } else {
      let error = 'Fields: ';
      if (this.username.length === 0) {
        error += 'username';
      }
      if (this.password.length === 0) {
        if (this.username.length === 0) {
          error += ', ';
        }
        error += 'password';
      }

      if (this.currentPassword.length === 0) {
        if (this.username.length === 0 || this.password.length === 0) {
          error += ', ';
        }
        error += 'current password';
      }

      if (this.email.length === 0) {
        if (
          this.username.length === 0 ||
          this.password.length === 0 ||
          this.currentPassword.length === 0
        ) {
          error += ', ';
        }
        error += 'email';
      }
      error += ' should not be blank!';
      this.message = error;
    }
  }

  isPasswordError() {
    if (this.message.length > 0) {
      return this.message.toLowerCase().includes('password');
    }
  }

  isUsernameError() {
    if (this.message.length > 0) {
      return this.message.toLowerCase().includes('username');
    }
  }

  isEmailError() {
    if (this.message.length > 0) {
      return this.message.toLowerCase().includes('email');
    }
  }

  isConfirmPasswordError() {
    if (this.message.length > 0) {
      return (
        this.message.toLowerCase().includes('confirmation') ||
        this.message.includes('current password')
      );
    }
  }

  clearFields() {
    this.username = '';
    this.password = '';
    this.currentPassword = '';
    this.email = '';
  }
}
