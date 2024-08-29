import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import { TaxistaService } from '../../../services/taxista.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaxiService } from '../../../services/taxi.service';
import { Taxi } from '../../../model/taxiDTO';
import { Taxista } from '../../../model/TaxistaDTO';
import Swal from 'sweetalert2';

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
    MatExpansionModule
  ],
  templateUrl: './recarga.component.html',
  styleUrl: './recarga.component.css'
})
export class RecargaComponent {

  //Servicios
  taxistaService: TaxistaService = inject(TaxistaService);
  taxiService: TaxiService = inject(TaxiService);

  formPlaca!: FormGroup;
  formRecarga!: FormGroup;

  encuentraInfomacionConPlaca: boolean = false;
  taxi: Taxi | null = null;
  taxista: Taxista | null = null;

  ngOnInit() {
    //this.taxistaService.testGet().subscribe(e => console.log(e));
    this.construirFormulario();
    this.construirFormularioRecarga();
    //this.buscar();
  }

  buscar() {
    this.taxistaService.getTaxista('placa_taxi', this.placaControl.value).subscribe({
      next: (t) => {
        this.encuentraInfomacionConPlaca = t != null ? true : false;
        this.taxista = t;

      },
      error: (e) => { }
    });

    this.taxiService.getTaxi('placa', this.placaControl.value).subscribe({
      next: (t) => {
        this.encuentraInfomacionConPlaca = t != null ? true : false;
        this.taxi = t;
        if(t == null){
          Swal.fire({
            title: "Sin información",
            text: "El taxi no se encontró",
            icon: "info"
          });
        }
      },
      error: (e) => { }
    });
  }

  construirFormulario() {
    this.formPlaca = new FormGroup({
      placa: new FormControl('', [Validators.required]),
    });
  }

  construirFormularioRecarga() {
    this.formRecarga = new FormGroup({
      valor: new FormControl('', [Validators.required]),
    });
  }

  recargar() {
    if (this.taxi?.subsidio) {
      this.taxi.subsidio += this.valorRecargaControl.value as number;
    } else {
      this.taxi!.subsidio = this.valorRecargaControl.value as number;
    }

    if (this.taxi) {
      this.taxiService.updateTaxi(this.taxi).then(r => {
        Swal.fire({
          title: "Recarga exitosa!",
          text: "Has realizado una recarga de subsidio!",
          icon: "success"
        });
        this.valorRecargaControl.setValue(0);
      }).catch(e => console.log(e));
    }
  }

  get placaControl(): FormControl {
    return this.formPlaca.get('placa') as FormControl;
  }

  get valorRecargaControl(): FormControl {
    return this.formRecarga.get('valor') as FormControl;
  }
}
