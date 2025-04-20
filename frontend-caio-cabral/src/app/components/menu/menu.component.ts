import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {}

  goToCreate() {
    this.router.navigate(['/create']);
  }

  goToDelete() {
    this.router.navigate(['/delete']);
  }

  goToUpdate() {
    this.router.navigate(['/update']);
  }

  goToView() {
    this.router.navigate(['/view']);
  }

  goToViewAll() {
    this.router.navigate(['/view-all']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
