import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnapshotListService } from './snapshot-list.service';
import { SnapshotData } from '@shared/types/snapshot/snapshot-data.type';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnapshotListComponent implements OnInit {

  readonly API = environment.api;
  networkTabs: string[];
  activeButtonIndex = 0;

  snapshotData: SnapshotData;
  activePanel: number = 0;

  networkFilter: string;
  contextFilter: string;
  fileExtensionFilter: string;

  allSnapshots: Snapshot[];

  constructor(private snapshotService: SnapshotListService,
              private cdRef: ChangeDetectorRef,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getSnapshots();
  }

  private getSnapshots(): void {
    this.snapshotService.getSnapshots().subscribe((snapshotData: SnapshotData) => {
      this.snapshotData = snapshotData;
      this.allSnapshots = snapshotData.snapshots;
      this.networkTabs = Array.from(snapshotData.networks);
      this.networkFilter = this.networkTabs[0];
      this.filterSnapshots();
      this.cdRef.detectChanges();
    });
  }

  updateOpenAccordionElement(index: number): void {
    if (this.activePanel !== index) {
      this.activePanel = index;
    }
  }

  copyToClipboard(code: HTMLDivElement): void {
    navigator.clipboard.writeText(code.textContent);
    this.snack.open('Command copied to clipboard', null, { duration: 3000 });
  }

  filterByNetwork(network: string): void {
    if (network === this.networkFilter) {
      this.networkFilter = undefined;
    } else {
      this.networkFilter = network;
    }
    this.filterSnapshots();
  }

  filterByContext(context: string): void {
    if (context === this.contextFilter) {
      this.contextFilter = undefined;
    } else {
      this.contextFilter = context;
    }
    this.filterSnapshots();
  }

  filterByExtension(extension: string): void {
    if (extension === this.fileExtensionFilter) {
      this.fileExtensionFilter = undefined;
    } else {
      this.fileExtensionFilter = extension;
    }
    this.filterSnapshots();
  }

  private filterSnapshots(): void {
    this.snapshotData.snapshots = this.allSnapshots.filter((snapshot: Snapshot) =>
      (this.networkFilter ? snapshot.network === this.networkFilter : true)
      && (this.contextFilter ? snapshot.context === this.contextFilter : true)
      && (this.fileExtensionFilter ? snapshot.fileExtension === this.fileExtensionFilter : true)
    );
  }
}
