import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { KetquaUpdateComponent } from 'app/entities/ketqua/ketqua-update.component';
import { KetquaService } from 'app/entities/ketqua/ketqua.service';
import { Ketqua } from 'app/shared/model/ketqua.model';

describe('Component Tests', () => {
  describe('Ketqua Management Update Component', () => {
    let comp: KetquaUpdateComponent;
    let fixture: ComponentFixture<KetquaUpdateComponent>;
    let service: KetquaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [KetquaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KetquaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KetquaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KetquaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Ketqua(123);
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
        const entity = new Ketqua();
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
