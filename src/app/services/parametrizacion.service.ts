import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore, updateDoc } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { Parametrizacion } from '../model/parametrizacion';

@Injectable({
  providedIn: 'root',
})
export class ParametrizacionService {
  private parametrizacionRef: CollectionReference<DocumentData>;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.parametrizacionRef = collection(
      this.firestore,
      FIRESTORE_TABLES.PARAMETRIZACION
    );
  }

  getParams(): Observable<Parametrizacion[]> {
    return collectionData(this.parametrizacionRef, {
      idField: 'id',
    }) as Observable<Parametrizacion[]>;
  }

  updateParams(parametrizacion: Parametrizacion) {
    const refContactoEmergencia = doc(
      this.firestore,
      FIRESTORE_TABLES.PARAMETRIZACION,
      parametrizacion.id
    );
    return updateDoc(refContactoEmergencia, {
      ...parametrizacion,
    });
  }
}
