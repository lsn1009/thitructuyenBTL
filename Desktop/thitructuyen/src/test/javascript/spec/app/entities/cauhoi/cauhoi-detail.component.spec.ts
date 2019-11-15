import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { CauhoiDetailComponent } from 'app/entities/cauhoi/cauhoi-detail.component';
import { Cauhoi } from 'app/shared/model/cauhoi.model';

describe('Component Tests', () => {
  describe('Cauhoi Management Detail Component', () => {
    let comp: CauhoiDetailComponent;
    let fixture: ComponentFixture<CauhoiDetailComponent>;
    const route = ({ data: of({ cauhoi: new Cauhoi(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [CauhoiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CauhoiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CauhoiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cauhoi).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
