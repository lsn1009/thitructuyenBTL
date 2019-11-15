import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ThitructuyenTestModule } from '../../../test.module';
import { DokhoComponent } from 'app/entities/dokho/dokho.component';
import { DokhoService } from 'app/entities/dokho/dokho.service';
import { Dokho } from 'app/shared/model/dokho.model';

describe('Component Tests', () => {
  describe('Dokho Management Component', () => {
    let comp: DokhoComponent;
    let fixture: ComponentFixture<DokhoComponent>;
    let service: DokhoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [DokhoComponent],
        providers: []
      })
        .overrideTemplate(DokhoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DokhoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DokhoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Dokho(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dokhos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
