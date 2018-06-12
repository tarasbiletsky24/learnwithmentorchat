import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    imports:[
        MatToolbarModule,
        MatGridListModule        
    ],
    exports:[
        MatToolbarModule,
        MatGridListModule       
    ]
})
export class MaterialModule{

}