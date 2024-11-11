import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [NgIf,NgClass],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {

  selectedTab: string = 'active';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
 
}
