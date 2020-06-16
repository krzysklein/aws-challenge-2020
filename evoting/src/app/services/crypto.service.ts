import { Injectable } from '@angular/core';
import { HMAC } from 'fast-sha256';

import { IdentityModel } from '../models/identity-model';
import { ElectionModel } from '../models/election-model';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor() { }

  getIdentityHashForElection(identity: IdentityModel, election: ElectionModel): string {
    const key = election.id;
    const keyBin = new TextEncoder().encode(key);
    const hmac = new HMAC(keyBin);
    const data = identity.id;
    const dataBin = new TextEncoder().encode(data);
    const mac = hmac.update(dataBin).digest();
    const macString = new TextDecoder().decode(mac);
    return macString;
  }
}
