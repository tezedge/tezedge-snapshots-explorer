import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/snapshot-list/snapshot-list.module').then(m => m.SnapshotsListModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy',
    onSameUrlNavigation: 'ignore',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
