import { inject, Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { map, Observable } from 'rxjs';
import { Taxi } from '../model/taxiDTO';
import { Transacciones } from '../model/transacciones';

@Injectable({
  providedIn: 'root',
})
export class TaxiService {
  private taxiRef: CollectionReference<DocumentData>;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.taxiRef = collection(this.firestore, FIRESTORE_TABLES.TAXI);
  }

  getTaxi(campo: string, valor: any): Observable<Taxi | null> {
    const usuario = query(this.taxiRef, where(campo, '==', valor));
    return (
      collectionData(usuario, { idField: 'id' }) as Observable<Taxi[]>
    ).pipe(map((taxis) => (taxis.length == 0 ? null : taxis[0])));
  }

  updateTaxi(taxi: Taxi) {
    const refContactoEmergencia = doc(
      this.firestore,
      FIRESTORE_TABLES.TAXI,
      taxi.id
    );
    return updateDoc(refContactoEmergencia, {
      ...taxi,
    });
  }

  createTransaccion(transaccion: Transacciones) {
    return addDoc(
      collection(this.firestore, FIRESTORE_TABLES.TRANSACCIONES),
      transaccion
    );
  }
}
