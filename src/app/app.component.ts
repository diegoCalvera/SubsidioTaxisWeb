import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TransaccionesService } from './services/transacciones.service';
import { Transaccion } from './model/transaccionesDTO';
import { TIPO_TRANSACCION } from '../utils/enums/enums';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  title = 'subsidio-taxis-web';
  durationInSeconds = 5;
  private _snackBar = inject(MatSnackBar);
  //Servicios inyectados.
  transaccionesServicio: TransaccionesService = inject(TransaccionesService);

  //Variables   
  listaTransacciones!: Transaccion[];

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
  });

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit() {
    this.transaccionesServicio.obtenerTodasLasTransacciones().subscribe({
      next: (p) => {
        this.listaTransacciones = p.filter(t => t.tipo_transaccion === TIPO_TRANSACCION.RECHAZADO && t.visto === false);
        console.log(this.listaTransacciones);
        if (this.listaTransacciones.length > 0) {
          //this.openSnackBar();
          this.toast.fire({
            text: 'Alerta de rechazo',
            icon: 'warning',
          });
        }
      },
    });
  }

  openSnackBar() {
    this._snackBar.open('Alerta', 'Test', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }
}
