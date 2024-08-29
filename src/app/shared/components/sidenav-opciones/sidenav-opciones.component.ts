import { Component, Input, computed, inject, signal } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export type MenuItem = {
  icon: string,
  label: string,
  route: string
}

@Component({
  selector: 'app-sidenav-opciones',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidenav-opciones.component.html',
  styleUrl: './sidenav-opciones.component.css'
})
export class SidenavOpcionesComponent {

  

  constructor(private router: Router) { }
  sideNavCollapsado = signal(false);
  @Input() set collapsado(val: boolean) {
    this.sideNavCollapsado.set(val);
  };

  menuItems = signal<MenuItem[]>([
    {
      icon: 'groups',
      label: 'Recarga',
      route: 'recarga'
    },
    {
      icon: 'equalizer',
      label: 'Parametrización',
      route: 'parametrizacion'
    },
    {
      icon: 'notifications',
      label: 'Transacciones',
      route: 'transacciones'
    },
    {
      icon: 'flag',
      label: 'Reportes',
      route: 'reporte'
    },
    /*{
      icon: 'logout',
      label: 'Salir',
      route: 'logout'
    }*/
  ]);

  imagenPerfilTamano = computed(() => this.sideNavCollapsado() ? '35' : '100');

  cerrarSesion() {

    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Algo salió mal...",
          text: "Error al cerrar sesión",
          icon: "error"
        });
      }
    });
  }
}
