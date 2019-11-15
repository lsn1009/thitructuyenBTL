import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { LoaiDetailComponent } from 'app/entities/loai/loai-detail.component';
import { Loai } from 'app/shared/model/loai.model';

describe('Component Tests', () => {
  describe('Loai Management Detail Component', () => {
    let comp: LoaiDetailComponent;
    let fixture: ComponentFixture<LoaiDetailComponent>;
    const route = ({ data: of({ loai: new Loai(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [LoaiDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LoaiDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoaiDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.loai).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
