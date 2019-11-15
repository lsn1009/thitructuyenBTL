import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ThitructuyenTestModule } from '../../../test.module';
import { CauhoiDeleteDialogComponent } from 'app/entities/cauhoi/cauhoi-delete-dialog.component';
import { CauhoiService } from 'app/entities/cauhoi/cauhoi.service';

describe('Component Tests', () => {
  describe('Cauhoi Management Delete Component', () => {
    let comp: CauhoiDeleteDialogComponent;
    let fixture: ComponentFixture<CauhoiDeleteDialogComponent>;
    let service: CauhoiService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ThitructuyenTestModule],
        declarations: [CauhoiDeleteDialogComponent]
      })
        .overrideTemplate(CauhoiDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CauhoiDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CauhoiService);
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
