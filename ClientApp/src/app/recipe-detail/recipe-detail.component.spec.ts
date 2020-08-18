/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { RecipeDetailComponent } from './recipe-detail.component';

let component: RecipeDetailComponent;
let fixture: ComponentFixture<RecipeDetailComponent>;

describe('recipe-detail component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ RecipeDetailComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(RecipeDetailComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});