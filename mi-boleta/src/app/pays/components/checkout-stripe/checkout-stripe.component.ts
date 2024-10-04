import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';
import { PaymentResponse } from '../../dto/PaymentResponse'; // Ajusta la ruta según sea necesario


@Component({
  selector: 'app-checkout-stripe',
  standalone: true,
  imports: [],
  templateUrl: './checkout-stripe.component.html',
  styleUrls: ['./checkout-stripe.component.css']
})
export class CheckoutStripeComponent {

  // Valores que deben ser introducidos por el usuario o calculados en el frontend
  transactionAmount: number = 100; // Ejemplo, en dólares (100.00 USD)
  description: string = 'Mi Boleta';
  payerEmail: string = 'usuario@correo.com'; // Reemplaza por el email del pagador
  paymentStrategyId: string = 'stripe'; // ID de la estrategia de pago

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) {}

  checkout() {
    const purchaseOrderDTO2 = {
      cart: [
          {
              idEvent: 'event_001',
              idLocality: 'locality_001',
              nameLocality: 'Localidad A',
              unitValue: 50,
              quantity: 2,
          },
          {
              idEvent: 'event_002',
              idLocality: 'locality_002',
              nameLocality: 'Localidad B',
              unitValue: 75,
              quantity: 1,
          }
      ],
      creationDate: new Date(),
      emailUser: 'usuario@example.com',
      idOrder: 'order_001',
      idUser: 'user_001',
      stateOrder: 'INACTIVE',
      transactionAmount: 175000,
  };
  
  const paymentRequest = {
      purchaseOrderDTO: purchaseOrderDTO2,
      strategyId: 'stripe',
  };

// Imprimir el objeto de prueba en consola

console.log(paymentRequest);
     // Enviar request con el parámetro de estrategia de pago
    const url = `http://localhost:8086/payments/pay`;

    this.http.post<PaymentResponse>(url, paymentRequest) // Especifica el tipo de respuesta aquí
      .pipe(
        switchMap((response: PaymentResponse) => {
          // Verifica si 'response.data' y 'response.data.url' existen
          if (response?.data?.url) {
            console.log(response);
            // Extraer el sessionId de la URL
            const sessionUrl = response.data.url;
            const sessionId = sessionUrl.split('/').pop()?.split('#')[0]; // Extraer solo el sessionId
            
            // Asegurarse de que sessionId no sea undefined
            if (sessionId) {
              return this.stripeService.redirectToCheckout({ sessionId });
            } else {
              throw new Error('No se pudo extraer el sessionId del URL');
            }
          } else {
            throw new Error('No se pudo obtener el URL de sesión de pago');
          }
        })
     
      ).subscribe(result => {
        if (result.error) {
          alert(result.error.message);
        }
      }, error => {
        console.error('Error al procesar el pago:', error);
        alert('Ocurrió un error al procesar el pago. Intenta nuevamente.');
      });
  }
}
