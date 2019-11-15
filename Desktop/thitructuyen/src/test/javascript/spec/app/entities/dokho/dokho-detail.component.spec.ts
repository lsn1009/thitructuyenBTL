import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { DokhoDetailComponent } from 'app/entities/dokho/dokho-detail.component';
import { Dokho } from 'app/shared/model/dokho.model';

describe('Component Tests', () => {
  describe('Dokho Management Detail Component', () => {
    let comp: DokhoDetailComponent;
    let fixture: ComponentFixture<DokhoDetailComponent>;
    const route = ({ data: of({ dokho: new Dokho(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [DokhoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DokhoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DokhoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dokho).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
