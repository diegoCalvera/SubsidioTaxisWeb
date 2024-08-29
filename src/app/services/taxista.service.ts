import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { Taxista } from '../model/TaxistaDTO';


@Injectable({
  providedIn: 'root'
})
export class TaxistaService {
  private taxistasRef: CollectionReference<DocumentData>;
  
  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.taxistasRef = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
  }

  testGet(): Observable<Taxista[]> {
    const taxistas = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    return collectionData(taxistas) as Observable<Taxista[]>;
  }

  getTaxista(campo: string, valor: any): Observable<Taxista | null> {
    const usuario = query(this.taxistasRef, where(campo, '==', valor));
    return (collectionData(usuario, { idField: 'id' }) as Observable<Taxista[]>).pipe(
      map( (taxistas) => taxistas.length == 0 ? null : taxistas[0] )
    );
  }

  
}
