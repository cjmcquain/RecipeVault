/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EditProfileComponent } from './edit-profile.component';

let component: EditProfileComponent;
let fixture: ComponentFixture<EditProfileComponent>;

describe('edit-profile component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EditProfileComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EditProfileComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});