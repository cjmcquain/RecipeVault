/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SidenavListComponent } from './sidenav-list.component';

let component: SidenavListComponent;
let fixture: ComponentFixture<SidenavListComponent>;

describe('sidenavList component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SidenavListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SidenavListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});