import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TransaccionesService } from '../../../services/transacciones.service';
import { Transaccion } from '../../../model/transaccionesDTO';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatRippleModule
  ],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent {

  //Servicios inyectados.
  transaccionesServicio: TransaccionesService = inject(TransaccionesService);

  //Variables 
  listaTransacciones!: Transaccion[];

  displayedColumns: string[] = ['placa', 'tipo_transaccion', 'valor', 'estacion','timestamp'];
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
        this.listaTransacciones = p;
        this.listaTransacciones = this.listaTransacciones.sort(function (a, b) {
          return b.timestamp.seconds - a.timestamp.seconds;
        });
        console.log(this.listaTransacciones);
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.listaTransacciones);
      },
      error: (e) => {
        //console.log('Error al obtener las pesonas');
      },
      complete: () => {
        //console.log('Tarea realizada');
      }
    });

    //this.dataSource = new MatTableDataSource(this.listaPersonas);
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

  redireccionar(transaccion : Transaccion) {
    console.log(":)");
  }

}
