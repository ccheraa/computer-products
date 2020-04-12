import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from '@angular/material';


const COMPONENTS = [
  Material.MatSidenavModule,
  Material.MatToolbarModule,
  Material.MatListModule,
  Material.MatIconModule,
  Material.MatCardModule,
  Material.MatFormFieldModule,
  Material.MatInputModule,
  Material.MatButtonModule,
  Material.MatSnackBarModule,
  Material.MatTableModule,
  Material.MatMenuModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatDialogModule,
  Material.MatGridListModule,
  Material.MatSelectModule,
  Material.MatRadioModule,
  Material.MatSortModule,
  Material.MatPaginatorModule,
  Material.MatCheckboxModule
];

@NgModule({
  imports: [BrowserAnimationsModule, ...COMPONENTS],
  exports: [BrowserAnimationsModule, ...COMPONENTS]
})
export class AppMaterialModule { }
