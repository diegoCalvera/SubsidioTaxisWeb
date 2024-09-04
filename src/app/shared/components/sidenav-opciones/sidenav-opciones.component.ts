import { Component, Input, computed, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
import { TIPO_TRANSACCION } from '../../../../utils/enums/enums';
import { Transaccion } from '../../../model/transaccionesDTO';
import { TransaccionesService } from '../../../services/transacciones.service';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  badge?: string;
};

@Component({
  selector: 'app-sidenav-opciones',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    MatBadgeModule,
    RouterLinkActive,
  ],
  templateUrl: './sidenav-opciones.component.html',
  styleUrl: './sidenav-opciones.component.css',
})
export class SidenavOpcionesComponent {
  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
  });
  //Servicios inyectados.
  transaccionesServicio: TransaccionesService = inject(TransaccionesService);

  //Variables
  listaTransacciones!: Transaccion[];
  cantidadNotificacionesRechazadas: number = 0;

  ngOnInit() {
    localStorage.setItem('visuazacionToast', 'true');
    this.transaccionesServicio.obtenerTodasLasTransacciones().subscribe({
      next: (p) => {
        this.listaTransacciones = p.filter(
          (t) =>
            t.tipo_transaccion === TIPO_TRANSACCION.RECHAZADO &&
            t.visto === false
        );
        this.cantidadNotificacionesRechazadas = this.listaTransacciones.length;
        if (
          this.cantidadNotificacionesRechazadas > 0 &&
          localStorage.getItem('visuazacionToast') === 'true'
        ) {
          this.toast.fire({
            text: 'Alerta de rechazo',
            icon: 'warning',
          });
        }

        this.menuItems.update((items) =>
          items.map((item) => {
            if (
              item.route === 'alerta' &&
              this.cantidadNotificacionesRechazadas > 0
            ) {
              return {
                ...item,
                badge: `${this.cantidadNotificacionesRechazadas}`,
              };
            }
            return { ...item, badge: '' };
          })
        );
      },
    });
  }

  constructor(private router: Router) {}
  sideNavCollapsado = signal(false);
  @Input() set collapsado(val: boolean) {
    this.sideNavCollapsado.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'groups',
      label: 'Recarga',
      route: 'recarga',
    },
    {
      icon: 'equalizer',
      label: 'Parametrización',
      route: 'parametrizacion',
    },
    {
      icon: 'format_list_bulleted',
      label: 'Transacciones',
      route: 'transacciones',
    },
    {
      icon: 'flag',
      label: 'Reportes',
      route: 'reporte',
    },
    {
      icon: 'notifications',
      label: 'Alertas',
      route: 'alerta',
    },
    /*{
      icon: 'logout',
      label: 'Salir',
      route: 'logout'
    }*/
  ]);

  imagenPerfilTamano = computed(() =>
    this.sideNavCollapsado() ? '35' : '100'
  );

  cerrarSesion() {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Algo salió mal...',
          text: 'Error al cerrar sesión',
          icon: 'error',
        });
      }
    });
  }
}
