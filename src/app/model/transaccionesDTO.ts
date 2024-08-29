import { Timestamp } from "firebase/firestore";

export interface Transaccion {
    estacion: string;
    placa: string;
    timestamp: Timestamp;
    tipo_transaccion: string;
    valor: string;
}
