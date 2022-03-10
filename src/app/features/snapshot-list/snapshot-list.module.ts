import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotListRoutingModule } from './snapshot-list.routing';
import { SnapshotListComponent } from './snapshot-list/snapshot-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SnapshotListComponent,
  ],
  imports: [
    CommonModule,
    SnapshotListRoutingModule,
    SharedModule,
  ]
})
export class SnapshotsListModule {}
