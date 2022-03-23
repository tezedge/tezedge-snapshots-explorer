import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnapshotListService } from './snapshot-list.service';
import { SnapshotData } from '@shared/types/snapshot/snapshot-data.type';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { environment } from '@environment/environment';
import { Router } from '@angular/router';
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

  snapshotData: SnapshotData;
  activeAccordionPanel: number = 0;

  activeNetworkIndex: number = 0;
  activeContextIndex: number = 0;
  activeExtensionIndex: number = 0;

  networkFilter: string;
  contextFilter: string;
  fileExtensionFilter: string;

  private allSnapshots: Snapshot[];

  constructor(private snapshotService: SnapshotListService,
              private cdRef: ChangeDetectorRef,
              private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.getSnapshots();
  }

  private getSnapshots(): void {
    this.snapshotService.getSnapshots().subscribe((snapshotData: SnapshotData) => {
      this.snapshotData = snapshotData;
      console.log(snapshotData);
      this.allSnapshots = snapshotData.snapshots;
      // this.networkFilter = snapshotData.networks[0];
      // this.contextFilter = snapshotData.contexts[0];
      // this.fileExtensionFilter = snapshotData.fileExtensions[0];
      // const name = this.router.url.split('/')[1];
      // const snapshotFromUrl = this.allSnapshots.find(s => s.fileName === name);
      // if (snapshotFromUrl) {
      //   this.networkFilter = snapshotFromUrl.network;
      // this.filterSnapshots();
      // this.activeAccordionPanel = this.snapshotData.snapshots.findIndex(s => s === snapshotFromUrl);
      // } else {
      //   this.networkFilter = this.networkTabs[0];
      // this.updateRoute(this.activeAccordionPanel);
      // }
      // this.activeNetworkIndex = this.networkTabs.indexOf(this.networkFilter);

      // this.filterSnapshots();
      this.cdRef.detectChanges();
    });
  }

  private updateRoute(snapshotIndex): void {
    // this.router.navigate([this.snapshotData.snapshots[snapshotIndex].fileName]);
  }

  updateOpenAccordionElement(index: number): void {
    if (this.activeAccordionPanel !== index) {
      this.activeAccordionPanel = index;
      this.updateRoute(index);
    }
  }

  copyToClipboard(): void {
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
