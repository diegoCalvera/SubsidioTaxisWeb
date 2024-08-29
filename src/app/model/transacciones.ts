export interface Transacciones {
  id?: string;
  estacion: string;
  placa: string;
  timestamp: Date;
  tipo_transaccion: string;
  valor?: number;
}
