import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  copyEmail() {
    const email = 'caiocabral.ep@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copiado para a área de transferência!');
    });
  }
}
