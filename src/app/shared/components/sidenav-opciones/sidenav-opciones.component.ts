import { Component, Input, computed, inject, signal } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Transaccion } from '../../../model/transaccionesDTO';
import { TIPO_TRANSACCION } from '../../../../utils/enums/enums';


export type MenuItem = {
  icon: string,
  label: string,
  route: string
  badge?: string
}

@Component({
  selector: 'app-sidenav-opciones',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    MatBadgeModule,
    RouterLinkActive
  ],
  templateUrl: './sidenav-opciones.component.html',
  styleUrl: './sidenav-opciones.component.css'
})
export class SidenavOpcionesComponent {

  //Servicios inyectados.
  transaccionesServicio: TransaccionesService = inject(TransaccionesService);

  //Variables   
  listaTransacciones!: Transaccion[];
  cantidadNotificacionesRechazadas: number = 0;


  ngOnInit() {
    this.transaccionesServicio.obtenerTodasLasTransacciones().subscribe({
      next: (p) => {
        this.listaTransacciones = p.filter(t => t.tipo_transaccion === TIPO_TRANSACCION.RECHAZADO && t.visto === false);
        this.cantidadNotificacionesRechazadas = this.listaTransacciones.length;
        console.log(this.listaTransacciones);
        this.menuItems.update(items =>
          items.
            map(item => {
              if (item.route === 'alerta' && this.cantidadNotificacionesRechazadas > 0) {
                return ({ ...item, badge: `${this.cantidadNotificacionesRechazadas}` });
              } return ({ ...item })
            })
        );
      },
    });
  }



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
      route: 'parametrizacion',
    },
    {
      icon: 'notifications',
      label: 'Transacciones',
      route: 'transacciones',
    },
    {
      icon: 'flag',
      label: 'Reportes',
      route: 'reporte',
    },
    {
      icon: 'flag',
      label: 'Alertas',
      route: 'alerta',
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
