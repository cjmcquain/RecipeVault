/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddRecipeComponent } from './add-recipe.component';

let component: AddRecipeComponent;
let fixture: ComponentFixture<AddRecipeComponent>;

describe('add-recipe component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddRecipeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AddRecipeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
