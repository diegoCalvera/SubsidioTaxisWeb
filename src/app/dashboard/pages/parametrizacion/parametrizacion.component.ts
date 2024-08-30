import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';


export interface TipoDocumento {
  id: string;
  descripcion: string;
}


@Component({
  selector: 'app-parametrizacion',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MatSlideToggleModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  templateUrl: './parametrizacion.component.html',
  styleUrl: './parametrizacion.component.css'
})

export class ParametrizacionComponent {

  tiposDocumento: TipoDocumento[] = [];
  idDocSeleccionado: string | undefined;
  formPersona!: FormGroup;

  ngOnInit() {
    this.tiposDocumento.push({
      id: '1',
      descripcion: 'El Gelver'
    });

    this.tiposDocumento.push({
      id: '2',
      descripcion: 'El Juan Cuadrado'
    });


    this.tiposDocumento.push({
      id: '3',
      descripcion: 'El Carlos Raba'
    });

    this.tiposDocumento.push({
      id: '4',
      descripcion: 'El Pablo'
    });

    

    this.idDocSeleccionado = this.tiposDocumento[0].id;
    this.construirFormulario();
  }

  construirFormulario() {
    this.formPersona = new FormGroup({
      tipo_documento_id: new FormControl(this.idDocSeleccionado, [Validators.required]),
    })
  }
}


