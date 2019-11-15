import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ThitructuyenTestModule } from '../../../test.module';
import { KetquaComponent } from 'app/entities/ketqua/ketqua.component';
import { KetquaService } from 'app/entities/ketqua/ketqua.service';
import { Ketqua } from 'app/shared/model/ketqua.model';

describe('Component Tests', () => {
  describe('Ketqua Management Component', () => {
    let comp: KetquaComponent;
    let fixture: ComponentFixture<KetquaComponent>;
    let service: KetquaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [KetquaComponent],
        providers: []
      })
        .overrideTemplate(KetquaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KetquaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KetquaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ketqua(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ketquas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
