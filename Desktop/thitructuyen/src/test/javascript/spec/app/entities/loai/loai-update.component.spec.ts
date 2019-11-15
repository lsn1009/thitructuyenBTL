import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { LoaiUpdateComponent } from 'app/entities/loai/loai-update.component';
import { LoaiService } from 'app/entities/loai/loai.service';
import { Loai } from 'app/shared/model/loai.model';

describe('Component Tests', () => {
  describe('Loai Management Update Component', () => {
    let comp: LoaiUpdateComponent;
    let fixture: ComponentFixture<LoaiUpdateComponent>;
    let service: LoaiService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [LoaiUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LoaiUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LoaiUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoaiService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Loai(123);
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
        const entity = new Loai();
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
