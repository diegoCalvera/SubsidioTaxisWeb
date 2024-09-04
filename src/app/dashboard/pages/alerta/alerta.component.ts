import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Transaccion } from '../../../model/transaccionesDTO';
import { TransaccionesService } from '../../../services/transacciones.service';
import { TIPO_TRANSACCION } from '../../../../utils/enums/enums';


@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule,
  ],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent {
  //Servicios inyectados.
  transaccionesServicio: TransaccionesService = inject(TransaccionesService);

  //Variables
  listaTransacciones!: Transaccion[];
  listaTransaccionesSinVer: Transaccion[] = [];

  displayedColumns: string[] = [
    'placa',
    'tipo_transaccion',
    'valor',
    'estacion',
    'timestamp',
  ];
  dataSource!: MatTableDataSource<Transaccion>;

  centered = false;
  disabled = false;
  unbounded = false;

  radius!: number;
  color!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource([] as Transaccion[]);
    this.transaccionesServicio.obtenerTodasLasTransacciones().subscribe({
      next: (p) => {
        this.listaTransacciones = p.filter(t => t.tipo_transaccion == TIPO_TRANSACCION.RECHAZADO);
        this.listaTransaccionesSinVer = this.listaTransacciones.filter(l => l.visto === false);
        
        this.listaTransacciones = this.listaTransacciones.sort(function (a, b) {
          return b.timestamp.seconds - a.timestamp.seconds;
        });
        this.dataSource = new MatTableDataSource(this.listaTransacciones);
      },
    });
  }

  ngOnInit(){
    this.actualizarRechazoVisto();    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  actualizarRechazoVisto() {
    setTimeout(() => {
      this.listaTransaccionesSinVer = this.listaTransaccionesSinVer.map(item => ({ ...item, visto: true }));
      console.log(this.listaTransaccionesSinVer);
      console.log('actualizarRechazoVisto');
      if(this.listaTransaccionesSinVer.length > 0){
        this.listaTransaccionesSinVer.forEach(t => this.transaccionesServicio.updateTransaccion(t));
      }
    }, 2000);
    /*if(this.listaTransaccionesSinVer.length > 0){
      this.listaTransaccionesSinVer.forEach(t => this.transaccionesServicio.updateTransaccion(t));
    }*/
  }

}
