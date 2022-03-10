import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Snapshot } from '@shared/types/snapshot/snapshot.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnapshotListService } from './snapshot-list.service';

@Component({
  selector: 'app-snapshot-list',
  templateUrl: './snapshot-list.component.html',
  styleUrls: ['./snapshot-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnapshotListComponent implements OnInit {

  readonly buttonTabs = ['MAINNET', 'TESTNET'];
  activeButtonIndex = 0;

  snapshots: Snapshot[];
  activePanel: number = 0;
  filterType = '';

  constructor(private snapshotService: SnapshotListService,
              private cdRef: ChangeDetectorRef,
              private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getSnapshots();
  }

  private getSnapshots(): void {
    this.snapshotService.getSnapshots().subscribe(snapshots => {
      this.snapshots = snapshots;
      console.log(this.snapshots);
      this.cdRef.detectChanges();
    });
  }

  updateOpenAccordionElement(index: number): void {
    if (this.activePanel !== index) {
      this.activePanel = index;
    }
  }

  filterSnapshots(type: string): void {
    if (this.filterType === type) {
      this.filterType = '';
    } else {
      this.filterType = type;
    }
    this.cdRef.detectChanges();
  }

  copyToClipboard(code: HTMLDivElement): void {
    navigator.clipboard.writeText(code.textContent);
    this.snack.open('Copied to clipboard', null, { duration: 3000 });
  }
}
