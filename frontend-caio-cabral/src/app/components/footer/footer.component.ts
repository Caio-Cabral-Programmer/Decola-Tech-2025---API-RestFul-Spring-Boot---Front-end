import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  copyEmail() {
    const email = 'seu-email@exemplo.com';
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copiado para a área de transferência!');
    });
  }
}
