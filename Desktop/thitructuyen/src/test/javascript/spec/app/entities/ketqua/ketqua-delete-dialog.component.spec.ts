import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ThitructuyenTestModule } from '../../../test.module';
import { KetquaDeleteDialogComponent } from 'app/entities/ketqua/ketqua-delete-dialog.component';
import { KetquaService } from 'app/entities/ketqua/ketqua.service';

describe('Component Tests', () => {
  describe('Ketqua Management Delete Component', () => {
    let comp: KetquaDeleteDialogComponent;
    let fixture: ComponentFixture<KetquaDeleteDialogComponent>;
    let service: KetquaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [KetquaDeleteDialogComponent]
      })
        .overrideTemplate(KetquaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KetquaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KetquaService);
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
