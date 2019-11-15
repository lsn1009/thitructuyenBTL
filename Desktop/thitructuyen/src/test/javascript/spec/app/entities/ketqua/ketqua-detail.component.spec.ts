import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { KetquaDetailComponent } from 'app/entities/ketqua/ketqua-detail.component';
import { Ketqua } from 'app/shared/model/ketqua.model';

describe('Component Tests', () => {
  describe('Ketqua Management Detail Component', () => {
    let comp: KetquaDetailComponent;
    let fixture: ComponentFixture<KetquaDetailComponent>;
    const route = ({ data: of({ ketqua: new Ketqua(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [KetquaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KetquaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KetquaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ketqua).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
