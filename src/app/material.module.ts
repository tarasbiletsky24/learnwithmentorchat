import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatTabsModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports: [
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatToolbarModule,
        MatDialogModule,
        MatTabsModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule
    ]
})
export class MaterialModule {

}
