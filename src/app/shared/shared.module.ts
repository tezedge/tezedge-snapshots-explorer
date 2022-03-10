import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  exports: [
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTooltipModule,
  ]
})
class MaterialModule {}


const SHARED_MODULES = [
  MaterialModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: SHARED_MODULES
})
export class SharedModule {}
