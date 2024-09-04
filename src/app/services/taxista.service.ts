import { inject, Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { Taxista } from '../model/TaxistaDTO';
import { InfoTaxi } from '../model/info-taxi';

@Injectable({
  providedIn: 'root',
})
export class TaxistaService {
  private taxistasRef: CollectionReference<DocumentData>;
  private infoTaxiRef: CollectionReference<DocumentData>;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.taxistasRef = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    this.infoTaxiRef = collection(this.firestore, FIRESTORE_TABLES.INFO_TAXI);
  }

  testGet(): Observable<Taxista[]> {
    const taxistas = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    return collectionData(taxistas) as Observable<Taxista[]>;
  }

  getTaxista(campo: string, valor: any): Observable<Taxista | null> {
    const usuario = query(this.taxistasRef, where(campo, '==', valor));
    return (
      collectionData(usuario, { idField: 'id' }) as Observable<Taxista[]>
    ).pipe(map((taxistas) => (taxistas.length == 0 ? null : taxistas[0])));
  }

  getInfoTaxi(campo: string, valor: any): Observable<InfoTaxi[]> {
    const usuario = query(this.infoTaxiRef, where(campo, '==', valor));
    return collectionData(usuario, { idField: 'id' }) as Observable<InfoTaxi[]>;
  }

  registrarTaxiConId(taxista: Taxista) {
    return setDoc(doc(this.firestore, FIRESTORE_TABLES.TAXISTA, taxista.id), taxista);
  }

  registrarTaxiInfoConId(taxi_info: any) {
    return setDoc(doc(this.firestore, FIRESTORE_TABLES.INFO_TAXI, taxi_info.id), taxi_info);
  }
}
