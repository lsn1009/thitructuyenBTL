import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ThitructuyenTestModule } from '../../../test.module';
import { CauhoiComponent } from 'app/entities/cauhoi/cauhoi.component';
import { CauhoiService } from 'app/entities/cauhoi/cauhoi.service';
import { Cauhoi } from 'app/shared/model/cauhoi.model';

describe('Component Tests', () => {
  describe('Cauhoi Management Component', () => {
    let comp: CauhoiComponent;
    let fixture: ComponentFixture<CauhoiComponent>;
    let service: CauhoiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [CauhoiComponent],
        providers: []
      })
        .overrideTemplate(CauhoiComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CauhoiComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CauhoiService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Cauhoi(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cauhois[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
