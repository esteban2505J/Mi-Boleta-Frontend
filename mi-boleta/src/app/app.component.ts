import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CheckoutStripeComponent } from "./pays/components/checkout-stripe/checkout-stripe.component";
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    CheckoutStripeComponent,
   ButtonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi-boleta';
}
