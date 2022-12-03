import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports:[
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule
    ],
    exports:[
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule
    ]
})
export class MaterialModule{}