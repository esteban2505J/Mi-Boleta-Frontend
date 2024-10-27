import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CheckoutStripeComponent } from './pays/components/checkout-stripe/checkout-stripe.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './Components/home/home/home.component';

export const routes: Routes = [
  
    { path: 'pago', component: CheckoutStripeComponent },
    {path: 'home', component:HomeComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export  class AppRoutingModule {}