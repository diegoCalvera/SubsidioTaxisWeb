import { inject, Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData } from '@angular/fire/firestore';
import { DocumentData, collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FIRESTORE_TABLES } from '../../utils/enums/enums';
import { Taxista } from '../model/TaxistaDTO';


@Injectable({
  providedIn: 'root'
})
export class TaxistaService {
  
  firestore: Firestore = inject(Firestore);

  constructor() { }

  testGet(): Observable<Taxista[]> {
    const taxistas = collection(this.firestore, FIRESTORE_TABLES.TAXISTA);
    return collectionData(taxistas) as Observable<Taxista[]>;
  }
}
