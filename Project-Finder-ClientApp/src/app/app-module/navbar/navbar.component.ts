import { TokenStorageService } from './../../services/token-storage-service/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {}

  isUserLoggedIn(): boolean {
    return this.tokenStorageService.getUser() !== null;
  }

  navigateToProfile(): void {
    this.router.navigate(['/board/profile']);
  }

  navigateToFind(): void {
    this.router.navigate(['/board/find']);
  }

  navigateToMyProjects(): void {
    this.router.navigate(['/board/myProjects']);
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
