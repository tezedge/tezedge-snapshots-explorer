import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  exports: [
    MatIconModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  declarations: []
})
class MaterialModule {}


const SHARED_MODULES = [
  MaterialModule,
  ClipboardModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES
  ]
})
export class SharedModule {}
