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
    console.log('Navegando para /create');
    this.router.navigateByUrl('/create');
  }

  goToDelete() {
    this.router.navigateByUrl('/delete');
  }

  goToUpdate() {
    this.router.navigateByUrl('/update');
  }

  goToView() {
    this.router.navigateByUrl('/view');
  }

  goToViewAll() {
    this.router.navigateByUrl('/view-all');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
