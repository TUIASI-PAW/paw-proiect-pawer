import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private tokenStorage: TokenStorageService) {

  }

  isUserLoggedIn = () => {
    return this.tokenStorage.getUser() != null;
  }
}
