import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ThitructuyenTestModule } from '../../../test.module';
import { LoaiDeleteDialogComponent } from 'app/entities/loai/loai-delete-dialog.component';
import { LoaiService } from 'app/entities/loai/loai.service';

describe('Component Tests', () => {
  describe('Loai Management Delete Component', () => {
    let comp: LoaiDeleteDialogComponent;
    let fixture: ComponentFixture<LoaiDeleteDialogComponent>;
    let service: LoaiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [LoaiDeleteDialogComponent]
      })
        .overrideTemplate(LoaiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LoaiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LoaiService);
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
