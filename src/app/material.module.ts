import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';



@NgModule({
    imports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule
    ],
    exports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule
    ]
})
export class MaterialModule {

}
