import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ThitructuyenTestModule } from '../../../test.module';
import { DokhoDeleteDialogComponent } from 'app/entities/dokho/dokho-delete-dialog.component';
import { DokhoService } from 'app/entities/dokho/dokho.service';

describe('Component Tests', () => {
  describe('Dokho Management Delete Component', () => {
    let comp: DokhoDeleteDialogComponent;
    let fixture: ComponentFixture<DokhoDeleteDialogComponent>;
    let service: DokhoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [DokhoDeleteDialogComponent]
      })
        .overrideTemplate(DokhoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DokhoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DokhoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
