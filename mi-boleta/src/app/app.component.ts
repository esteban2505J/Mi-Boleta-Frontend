import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'mi-boleta';
}
