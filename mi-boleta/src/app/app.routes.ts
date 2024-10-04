import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutStripeComponent } from './pays/components/checkout-stripe/checkout-stripe.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  
    { path: 'pago', component: CheckoutStripeComponent },// Ruta para el componente de pago
    { path: '', redirectTo: '/pago', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export  class AppRoutingModule {}