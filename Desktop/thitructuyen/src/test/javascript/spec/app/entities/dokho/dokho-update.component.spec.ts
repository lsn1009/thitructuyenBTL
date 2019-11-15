import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ThitructuyenTestModule } from '../../../test.module';
import { DokhoUpdateComponent } from 'app/entities/dokho/dokho-update.component';
import { DokhoService } from 'app/entities/dokho/dokho.service';
import { Dokho } from 'app/shared/model/dokho.model';

describe('Component Tests', () => {
  describe('Dokho Management Update Component', () => {
    let comp: DokhoUpdateComponent;
    let fixture: ComponentFixture<DokhoUpdateComponent>;
    let service: DokhoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [DokhoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DokhoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DokhoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DokhoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dokho(123);
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
        const entity = new Dokho();
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
