import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatTabsModule
    ],
    exports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatTabsModule
    ]
})
export class MaterialModule {

}
