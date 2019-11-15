import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { CauhoiUpdateComponent } from 'app/entities/cauhoi/cauhoi-update.component';
import { CauhoiService } from 'app/entities/cauhoi/cauhoi.service';
import { Cauhoi } from 'app/shared/model/cauhoi.model';

describe('Component Tests', () => {
  describe('Cauhoi Management Update Component', () => {
    let comp: CauhoiUpdateComponent;
    let fixture: ComponentFixture<CauhoiUpdateComponent>;
    let service: CauhoiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [CauhoiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CauhoiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CauhoiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CauhoiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cauhoi(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Cauhoi();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
