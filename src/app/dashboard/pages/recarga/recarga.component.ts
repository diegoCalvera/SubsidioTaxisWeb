import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import Swal from 'sweetalert2';
import { InfoTaxi } from '../../../model/info-taxi';
import { Taxi } from '../../../model/taxiDTO';
import { Taxista } from '../../../model/TaxistaDTO';
import { Transacciones } from '../../../model/transacciones';
import { TaxiService } from '../../../services/taxi.service';
import { TaxistaService } from '../../../services/taxista.service';

@Component({
  selector: 'app-recarga',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAccordion,
    MatExpansionModule,
    MatTabsModule,
  ],
  templateUrl: './recarga.component.html',
  styleUrl: './recarga.component.css',
})
export class RecargaComponent {
  //Servicios
  taxistaService: TaxistaService = inject(TaxistaService);
  taxiService: TaxiService = inject(TaxiService);

  formPlaca!: FormGroup;
  formPlacaMasivo!: FormGroup;
  formRecarga!: FormGroup;

  encuentraInfomacionConPlaca: boolean = false;
  taxi: Taxi | null = null;
  taxista: Taxista | null = null;
  info_taxi: InfoTaxi | null = null;
  srcResult: any;
  archivo: any;

  ngOnInit() {
    //this.taxistaService.testGet().subscribe(e => console.log(e));
    this.construirFormulario();
    this.construirFormularioRecarga();
  }

  buscar() {
    this.taxistaService
      .getTaxista('placa_taxi', this.placaControl.value)
      .subscribe({
        next: (t) => {
          this.encuentraInfomacionConPlaca = t != null ? true : false;
          this.taxista = t;
        },
        error: (e) => {},
      });

    this.taxistaService
      .getInfoTaxi('placa', this.placaControl.value)
      .subscribe({
        next: (t) => {
          console.log(t);

          this.info_taxi = t[0];
        },
        error: (e) => {},
      });

    this.taxiService.getTaxi('placa', this.placaControl.value).subscribe({
      next: (t) => {
        this.encuentraInfomacionConPlaca = t != null ? true : false;
        this.taxi = t;
        if (t == null) {
          Swal.fire({
            title: 'Sin información',
            text: 'El taxi no se encontró',
            icon: 'info',
          });
        }
      },
      error: (e) => {},
    });
  }

  construirFormulario() {
    this.formPlaca = new FormGroup({
      placa: new FormControl('', [Validators.required]),
    });
    this.formPlacaMasivo = new FormGroup({
      valor_cargue: new FormControl('', [Validators.required]),
    });
  }

  construirFormularioRecarga() {
    this.formRecarga = new FormGroup({
      valor: new FormControl('', [Validators.required]),
    });
  }

  validacionRecarga(infoTaxi: InfoTaxi) {
    if (
      infoTaxi.activo &&
      infoTaxi.poliza_contra &&
      infoTaxi.poliza_extra &&
      infoTaxi.soat &&
      infoTaxi.rtm &&
      infoTaxi.tarjeta_operacion
    ) {
      return true;
    } else {
      return false;
    }
  }

  recargar() {
    if (!this.validacionRecarga(this.info_taxi!)) {
      Swal.fire({
        title: 'Vehículo no habilitado',
        text: ' El vehículo no cumple con los requisitos para realizar una recarga',
        icon: 'info',
      });
      return;
    }
    let transaccion: Transacciones = {
      estacion: '',
      placa: this.placaControl.value,
      timestamp: new Date(),
      tipo_transaccion: 'RECARGA',
      valor: this.valorRecargaControl.value as number,
    };

    if (this.taxi?.subsidio) {
      this.taxi.subsidio += this.valorRecargaControl.value as number;
    } else {
      this.taxi!.subsidio = this.valorRecargaControl.value as number;
    }

    if (this.taxi) {
      this.taxiService
        .updateTaxi(this.taxi)
        .then((r) => {
          this.taxiService.createTransaccion(transaccion).then(() => {
            Swal.fire({
              title: 'Recarga exitosa!',
              text: 'Has realizado una recarga de subsidio!',
              icon: 'success',
            });
            this.valorRecargaControl.setValue(0);
          });
        })
        .catch((e) => console.log(e));
    }
  }

  transformToUppercase() {
    const placaControl = this.formPlaca.get('placa');
    if (placaControl) {
      const value = placaControl.value!.toUpperCase();
      placaControl.setValue(value, { emitEvent: false });
    }
  }

  get placaControl(): FormControl {
    return this.formPlaca.get('placa') as FormControl;
  }

  get valorRecargaControl(): FormControl {
    return this.formRecarga.get('valor') as FormControl;
  }

  seleccionarArchivo() {
    const inputNode: any = document.querySelector('#file');
    this.archivo = inputNode.files[0];

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  cargueMasivo() {
    if (!this.archivo) {
      Swal.fire({
        title: 'Error',
        text: 'No se ha seleccionado un archivo',
        icon: 'error',
      });
      return;
    } else {
      Swal.fire({
        title: 'Problema al recargar',
        text: 'Hacen falta campos solicitados en el archivo.',
        icon: 'info',
      });
      this.srcResult = null;
      this.archivo = null;
      this.formPlacaMasivo.reset();
    }
  }
}
