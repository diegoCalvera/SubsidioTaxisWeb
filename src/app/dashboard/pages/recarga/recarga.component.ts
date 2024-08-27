import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, inject } from '@angular/core';
import { TaxistaService } from '../../../services/taxista.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  templateUrl: './recarga.component.html',
  styleUrl: './recarga.component.css'
})
export class RecargaComponent {

  //Servicios
  taxistaService: TaxistaService = inject(TaxistaService);

  formRecarga!: FormGroup;

  ngOnInit() {
    this.taxistaService.testGet().subscribe(e => console.log(e));
    this.construirFormulario();
  }

  buscar(){}

  construirFormulario(){
    this.formRecarga = new FormGroup({
      placa : new FormControl('', [Validators.required]),
    });
  }
}
