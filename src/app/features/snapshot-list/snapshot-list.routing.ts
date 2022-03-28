import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SnapshotListComponent } from './snapshot-list/snapshot-list.component';

const routes: Routes = [
  {
    path: '',
    component: SnapshotListComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SnapshotListRoutingModule {}
