import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, DocumentData, updateDoc } from 'firebase/firestore';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { Observable } from 'rxjs';
import { Transaccion } from '../model/transaccionesDTO';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private taxistasRef: CollectionReference<DocumentData>;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.taxistasRef = collection(this.firestore, FIRESTORE_TABLES.TRANSACCIONES);
  }

  obtenerTodasLasTransacciones(): Observable<Transaccion[]> {
    return collectionData(this.taxistasRef, {idField : 'id'}) as Observable<Transaccion[]>;
  }


  updateTransaccion(transaccion: Transaccion) {
    const refTransacciones = doc(
      this.firestore,
      FIRESTORE_TABLES.TRANSACCIONES,
      transaccion.id
    );
    return updateDoc(refTransacciones, {
      ...transaccion,
    });
  }

}
