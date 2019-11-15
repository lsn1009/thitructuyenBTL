import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ThitructuyenTestModule } from '../../../test.module';
import { LoaiComponent } from 'app/entities/loai/loai.component';
import { LoaiService } from 'app/entities/loai/loai.service';
import { Loai } from 'app/shared/model/loai.model';

describe('Component Tests', () => {
  describe('Loai Management Component', () => {
    let comp: LoaiComponent;
    let fixture: ComponentFixture<LoaiComponent>;
    let service: LoaiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [LoaiComponent],
        providers: []
      })
        .overrideTemplate(LoaiComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoaiComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoaiService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Loai(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.loais[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
