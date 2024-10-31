import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ImageModule } from 'primeng/image';
import { DialogComponent } from '../../general/dialog/dialog.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports:  [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule, ImageModule, DialogComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  items: MenuItem[] | undefined;
  menuOpen = false;

  toggleMenu() {
     this.menuOpen = !this.menuOpen;
  }

  ngOnInit() {
    this.items = [
        {
            label: 'Eventos',
            icon: 'pi pi-home'
        },
        {
            label: 'Categorías',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S'
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B'
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U'
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: '2'
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: '3'
                        }
                    ]
                }
            ]
        },
      
    ];
}

}
