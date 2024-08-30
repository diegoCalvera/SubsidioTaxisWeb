import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
import { Parametrizacion } from '../../../model/parametrizacion';
import { ParametrizacionService } from '../../../services/parametrizacion.service';

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
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './parametrizacion.component.html',
  styleUrl: './parametrizacion.component.css',
})
export class ParametrizacionComponent {
  idDocSeleccionado: string | undefined;
  formParametrizacion!: FormGroup;
  modelo: any[] = [
    { value: '2000' },
    { value: '2001' },
    { value: '2002' },
    { value: '2003' },
    { value: '2004' },
    { value: '2005' },
    { value: '2006' },
    { value: '2007' },
    { value: '2008' },
    { value: '2009' },
    { value: '2010' },
    { value: '2011' },
    { value: '2012' },
    { value: '2013' },
    { value: '2014' },
    { value: '2015' },
    { value: '2016' },
    { value: '2017' },
    { value: '2018' },
    { value: '2019' },
    { value: '2020' },
    { value: '2021' },
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
  ];
  clase: any[] = [{ value: 'Particular' }, { value: 'Público' }];

  cilindraje: any[] = [
    { value: '1000' },
    { value: '1100' },
    { value: '1200' },
    { value: '1300' },
    { value: '1400' },
    { value: '1500' },
    { value: '1600' },
    { value: '1700' },
    { value: '1800' },
    { value: '1900' },
    { value: '2000' },
    { value: '2100' },
    { value: '2200' },
    { value: '2300' },
    { value: '2400' },
    { value: '2500' },
  ];

  tipo_vehiculo: any[] = [
    { value: 'Automóvil' },
    { value: 'Camioneta' },
    { value: 'Campero' },
    { value: 'Motocicleta' },
    { value: 'Cuatrimoto' },
    { value: 'Bicicleta' },
    { value: 'Triciclo' },
    { value: 'Bus' },
    { value: 'Buseta' },
    { value: 'Microbus' },
    { value: 'Minivan' },
    { value: 'Volqueta' },
    { value: 'Camión' },
    { value: 'Tractomula' },
    { value: 'Motocarro' },
    { value: 'Mototriciclo' },
    { value: 'Motociclo' },
  ];

  tipo_copmbustible: any[] = [
    { value: 'Gasolina' },
    { value: 'Diesel' },
    { value: 'Gas' },
    { value: 'Hibrido' },
    { value: 'Electrico' },
  ];

  parametrizacionActual!: Parametrizacion;

  constructor(private parametrizacionService: ParametrizacionService) {}

  ngOnInit() {
    this.initForm();
    this.parametrizacionService.getParams().subscribe({
      next: (p) => {
        this.parametrizacionActual = p[0];
        this.construirFormulario(this.parametrizacionActual);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  construirFormulario(parametrizacion: Parametrizacion) {
    this.formParametrizacion = new FormGroup({
      id: new FormControl(parametrizacion.id),
      modelo_desde: new FormControl(parametrizacion.modelo_desde, [
        Validators.required,
      ]),
      modelo_hasta: new FormControl(parametrizacion.modelo_hasta, [
        Validators.required,
      ]),
      clase: new FormControl(parametrizacion.clase, [Validators.required]),
      cilindraje_desde: new FormControl(parametrizacion.cilindraje_desde, [
        Validators.required,
      ]),
      cilindraje_hasta: new FormControl(parametrizacion.cilindraje_hasta, [
        Validators.required,
      ]),
      tipo_vehiculo: new FormControl(parametrizacion.tipo_vehiculo, [
        Validators.required,
      ]),
      combustible: new FormControl(parametrizacion.combustible, [
        Validators.required,
      ]),
    });
  }

  initForm() {
    this.formParametrizacion = new FormGroup({
      id: new FormControl(''),
      modelo_desde: new FormControl('', [Validators.required]),
      modelo_hasta: new FormControl('', [Validators.required]),
      clase: new FormControl('', [Validators.required]),
      cilindraje_desde: new FormControl('', [Validators.required]),
      cilindraje_hasta: new FormControl('', [Validators.required]),
      tipo_vehiculo: new FormControl('', [Validators.required]),
      combustible: new FormControl('', [Validators.required]),
    });
  }

  parametrizar() {
    this.parametrizacionService
      .updateParams(this.formParametrizacion.value)
      .then(() => {
        Swal.fire({
          title: 'Parametrización exitosa!',
          text: 'Has realizado la parametrización correctamente!',
          icon: 'success',
        });
      });
  }
}
