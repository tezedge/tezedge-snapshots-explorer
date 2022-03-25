import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnapshotListService } from './snapshot-list.service';
import { SnapshotData } from '@shared/types/snapshot/snapshot-data.type';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { environment } from '@environment/environment';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnapshotListComponent implements OnInit {

  readonly API = environment.api;
  activeTheme: string;

  snapshotData: SnapshotData;

  networkFilter: string[] = [];
  contextFilter: string[] = [];
  fileExtensionFilter: string[] = [];

  private allSnapshots: Snapshot[];

  constructor(private snapshotService: SnapshotListService,
              private cdRef: ChangeDetectorRef,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.activeTheme = localStorage.getItem('theme') || 'dark';
    this.changeTheme(this.activeTheme);
    this.getSnapshots();
  }

  private getSnapshots(): void {
    this.snapshotService.getSnapshots().subscribe((snapshotData: SnapshotData) => {
      this.snapshotData = snapshotData;
      this.allSnapshots = snapshotData.snapshots;
      this.cdRef.detectChanges();
    });
  }

  copyToClipboard(): void {
    this.snack.open('Command copied to clipboard', null, { duration: 3000 });
  }

  filterByNetwork(network: string): void {
    if (this.networkFilter.includes(network)) {
      this.networkFilter.splice(this.networkFilter.indexOf(network), 1);
    } else {
      this.networkFilter.push(network);
    }
    this.filterSnapshots();
  }

  filterByContext(context: string): void {
    if (this.contextFilter.includes(context)) {
      this.contextFilter.splice(this.contextFilter.indexOf(context), 1);
    } else {
      this.contextFilter.push(context);
    }
    this.filterSnapshots();
  }

  filterByExtension(extension: string): void {
    if (this.fileExtensionFilter.includes(extension)) {
      this.fileExtensionFilter.splice(this.fileExtensionFilter.indexOf(extension), 1);
    } else {
      this.fileExtensionFilter.push(extension);
    }
    this.filterSnapshots();
  }

  private filterSnapshots(): void {
    this.snapshotData.snapshots = this.allSnapshots.filter((snapshot: Snapshot) =>
      (this.networkFilter.length ? this.networkFilter.includes(snapshot.network) : true)
      && (this.contextFilter.length ? this.contextFilter.includes(snapshot.context) : true)
      && (this.fileExtensionFilter.length ? this.fileExtensionFilter.includes(snapshot.fileExtension) : true)
    );
  }

  changeTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.activeTheme = theme;

    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
  }
}
