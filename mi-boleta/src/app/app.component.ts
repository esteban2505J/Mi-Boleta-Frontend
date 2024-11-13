import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { CheckoutStripeComponent } from "./pays/components/checkout-stripe/checkout-stripe.component";
import { ButtonModule } from 'primeng/button';
import { NavBarComponent } from "./Components/navBar/nav-bar/nav-bar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    CheckoutStripeComponent,
    ButtonModule,
    NavBarComponent
],
providers:[CookieService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'mi-boleta';

  constructor(private cookieService: CookieService) {}

  guardarToken(token: string): void {
    const expirationDays = 7; // Duración de la cookie en días
    this.cookieService.set('auth_token', token, expirationDays);
  }

  leerToken(): string {
    return this.cookieService.get('auth_token');
  }

  eliminarToken(): void {
    this.cookieService.delete('auth_token');
  }
}
