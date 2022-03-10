import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SnapshotListService {

  constructor(private http: HttpClient) { }

  getSnapshots(): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>('http://162.55.241.136/mainnet/archive'),
      this.http.get<any[]>('http://162.55.241.136/mainnet/full'),
    ])
      .pipe(map((response: any[][]) => {
        const final = [...response[0], ...response[1]].map(snapshot => ({ datetime: snapshot.mtime, fileName: snapshot.name }));
        return final;
      }));
  }

  private static mapGetSnapshots(snapshots: any): Snapshot[] {
    return snapshots.map(sn => ({
      snapshot: sn.snapshot,
      protocol: sn.protocol,
      nodeVersion: sn['node version'],
      blockHash: sn.blockhash,
      blockNum: sn.blocknum,
      blockTime: sn.blocktime,
      fileName: sn.filename,
      network: sn.network,
      datetime: sn.blocktime.substr(0, 4) + '-' + sn.blocktime.substr(4, 2) + '-' + sn.blocktime.substr(6, 2)
    }));
  }
}
