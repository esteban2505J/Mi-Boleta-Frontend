import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  images: string[] = [
    'https://extraboletas.com/wp-content/uploads/2024/10/ARTE-1920-X-750-PX-PARA-PAGINA-WEB-DE-EXTRA-BOLETAS-scaled.jpg',
    'https://tuboleta.com/sites/default/files/styles/image_item_1550/public/2024-10/Conciertos-.png?itok=9LVgT39l',
    'https://tuboleta.com/sites/default/files/styles/image_item_1550/public/2024-09/banner-florecita.jpg?itok=s1egD1Cv',
    'https://extraboletas.com/wp-content/uploads/2024/10/BANNER-SIN-PRECIOS-NEIVA.jpg',
  ];
  currentIndex: number = 0;

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

}
