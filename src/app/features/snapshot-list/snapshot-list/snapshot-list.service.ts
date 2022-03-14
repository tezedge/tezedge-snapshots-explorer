import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable, switchMap } from 'rxjs';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SnapshotData } from '@shared/types/snapshot/snapshot-data.type';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SnapshotListService {

  private readonly API = environment.api;

  constructor(private http: HttpClient) { }

  getSnapshots(): Observable<SnapshotData> {
    return this.http.get<any[]>(this.API).pipe(
      map(networks => networks.slice(0, -1).map(n => n.name)),
      switchMap(networks => {
        const data: SnapshotData = {
          networks: new Set<string>(),
          contexts: new Set<string>(),
          fileExtensions: new Set<string>(),
          snapshots: [],
          stats: []
        };
        return this.findFilesInNetworks(networks, data).pipe(
          map(() => data)
        );
      }),
      map((snapshotData: SnapshotData) => {

        const data: SnapshotData = {
          networks: new Set(Array.from(snapshotData.networks).sort()),
          contexts: new Set(Array.from(snapshotData.contexts).sort()),
          fileExtensions: new Set(Array.from(snapshotData.fileExtensions).sort()),
          snapshots: snapshotData.snapshots.sort((s1, s2) => Date.parse(s2.datetime.toString()) - Date.parse(s1.datetime.toString()))
            .map(snapshot => ({ ...snapshot, datetime: this.formatDate(snapshot.datetime as Date) })),
          stats: []
        };
        data.networks.forEach(network => {
          data.stats.push({ name: network, value: data.snapshots.filter(s => s.network === network).length });
        });
        data.contexts.forEach(context => {
          data.stats.push({ name: context, value: data.snapshots.filter(s => s.context === context).length });
        });
        data.fileExtensions.forEach(extension => {
          data.stats.push({ name: extension, value: data.snapshots.filter(s => s.fileExtension === extension).length });
        });

        return data;
      })
    );
  }

  private findFilesInNetworks(networks: string[], data: SnapshotData): Observable<void[][][]> {
    return forkJoin(
      networks.map(network =>
        this.http.get<any[]>(`${this.API}/${network}`).pipe(
          map((contexts: any[]) => contexts.map(c => c.name)),
          mergeMap(contexts =>
            forkJoin(
              contexts.map(context =>
                this.http.get<any[]>(`${this.API}/${network}/${context}`).pipe(
                  map((fileExtensions: any[]) => fileExtensions.map(c => c.name)),
                  mergeMap(fileExtensions =>
                    forkJoin(
                      fileExtensions.map(extension => this.getFiles(network, context, extension, data))
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  private getFiles(network: string, context: string, extension: string, data: SnapshotData): Observable<void> {
    return this.http.get<any[]>(`${this.API}/${network}/${context}/${extension}`).pipe(
      map((files: any[]) =>
        files
          .filter(file => file.type === 'file' && !file.name.includes('.temp'))
          .map(file => ({
            datetime: this.getDate(file.name.split('_')[2]),
            type: file.type,
            fileName: file.name,
            size: file.size,
            hash: file.name.split('_')[3],
            network,
            context,
            fileExtension: extension
          } as Snapshot))
      ),
      map((snapshots: Snapshot[]) => {
        data.networks.add(network);
        data.contexts.add(context);
        data.fileExtensions.add(extension);
        data.snapshots.push(...snapshots);
      })
    );
  }

  private getDate(value: string): Date {
    const year = Number(value.substring(0, 4));
    const month = Number(value.substring(4, 6)) - 1;
    const day = Number(value.substring(6, 8));
    const hour = Number(value.substring(9, 11));
    const minute = Number(value.substring(11, 13));
    const second = Number(value.substring(13, 15));

    return new Date(year, month, day, hour, minute, second);
  }

  private formatDate(date: Date): string {
    const dateString = date.toISOString().replace('T', ', ');
    return dateString.substring(0, dateString.indexOf('.'));
  }
}
