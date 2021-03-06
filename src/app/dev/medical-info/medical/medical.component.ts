import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'medical',
  template: `
  <h1>Medical Info</h1>
  <div class="container">
    <div class="flexbox">
      <ul class="flex-card-list">
        <!--### S: Card List ###-->
        <li class="flex-card-listitem">
          <div class="flex-card">
            <!-- Card image -->
            <div class="flex-card-image">
              <img src="../../assets/img/medical1.jpg" alt="">
            </div>
            <!-- Card Content -->
            <div class="flex-card-content">
              <ul class="list-in-card flex-medical-list">
                <li>
                  <strong class="list-title">Date: </strong>
                  <span class="list-content">2017.12.06</span>
                </li>
                <li>
                  <strong class="list-title">Description: </strong>
                  <div class="list-content">중성화수술</div>
                </li>
                <li>
                  <strong class="list-title">Comment: </strong>
                  <div class="list-content overflow-scroll">수술은 성공적으로 끝났다!!<br>
                  끄르르르끄르<br>
                  길땐<br>
                  이렇게<br>
                  되여~</div>
                </li>
              </ul>
              <div class="btns-in-card">
                <button type="button" class="btn btn-radius btn-outline-mint btn-type1-mint" (click)="editModal.show()">Edit</button>
                <button type="button" class="btn btn-radius btn-mint" (click)="openModal(template)">Delete</button>
                <!--<button type="button" class="btn btn-primary" (click)="openModal(template)">Open modal</button>-->
              </div>
            </div>
          </div>
        </li>
        <!--### E: Card List ###-->
        <!--### S: Card List ###-->
        <li class="flex-card-listitem">
          <div class="flex-card">
            <!-- Card image -->
            <div class="flex-card-image">
              <img src="../../assets/img/medical1.jpg" alt="">
            </div>
            <!-- Card Content -->
            <div class="flex-card-content">
              <ul class="list-in-card flex-medical-list">
                <li>
                  <strong class="list-title">Date: </strong>
                  <span class="list-content">2017.12.06</span>
                </li>
                <li>
                  <strong class="list-title">Description: </strong>
                  <div class="list-content">중성화수술</div>
                </li>
                <li>
                  <strong class="list-title">Comment: </strong>
                  <div class="list-content overflow-scroll">수술은 성공적으로 끝났다!!<br>
                  끄르르르끄르<br>
                  길땐<br>
                  이렇게<br>
                  되여~</div>
                </li>
              </ul>
              <div class="btns-in-card">
                <button type="button" class="btn btn-radius btn-outline-mint btn-type1-mint">Edit</button>
                <button type="button" class="btn btn-radius btn-mint">Delete</button>
              </div>
            </div>
          </div>
        </li>
        <!--### E: Card List ###-->

        <!--S: Enroll Card List -->
        <li class="flex-card-listitem add-listitem">
          <div class="flex-card">
            <p class="new-card-guide">
              <button type="button" class="btn btn-primary icon-new-add" (click)="smModal.show()"><img src="../../../assets/img/plus-circular-icon.png" alt=""></button>
              <span class="text-new-add">Add New Medical Info</span>
            </p>
          </div>
        </li>        
      </ul>
    </div>
  </div>

<!--### 여기서부터 팝업영역 ###-->
  <!--의료정보 추가 팝업(Add)-->
  <div bsModal #smModal="bs-modal" id="my-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"  [config]="{backdrop: 'static'}">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close pull-right" aria-label="Close" (click)="smModal.hide()" (click)="myForm.reset()">
            <img src="../../../assets/img/btn-close.png" alt="">
          </button>
          <div class="flexbox enroll-list form-group">
            <!-- card list -->
            <ul class="flex-card-list">
              <!-- card list item -->
              <li class="flex-card-listitem">
                <!-- card module -->
                <div class="flex-card">
                  <!-- image container -->
                  <div class="flex-card-image">
                    <button type="button" class="icon-upload-img"><img src="../../../assets/img/btn-upload-img.png" alt=""></button>
                  </div>
                  <!-- content container -->
                  <div class="flex-card-content">
                    <!--s:form DatePicker포함-->
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                      <ul class="list-in-card flex-medical-list">
                        <li>
                          <label for="date" class="list-title">Date: </label> 
                          <!-- DatePicker -->
                          <input type="text" id="date" class="form-control" placeholder="Datepicker" bsDatepicker formControlName="date">
                          <div class="alert" *ngIf="!myForm.controls['date'].valid && myForm.controls['date'].touched">
                            You need to pick a date
                          </div>
                        </li>
                        <li>
                          <label for="description" class="list-title">Description: </label>
                          <textarea type="text" id="description" class="list-content" formControlName="description"></textarea>
                          <div class="alert" *ngIf="!myForm.controls['description'].valid && myForm.controls['description'].touched">
                            You must specify a description that's between 10 and 100 characters.
                          </div>
                        </li>
                        <li>
                          <label class="list-title">Comment: </label>
                          <textarea class="list-content overflow-scroll" resize="none"></textarea>
                        </li>
                      </ul>
                      <!--button submit-->
                      <div class="btns-in-card">
                        <button type="submit" class="btn btn-radius btn-outline-mint btn-type1-mint" [disabled]="!myForm.invalid">Enroll</button>
                      </div>
                    </form>
                    <!--e:form-->
                  </div>
                </div>
              </li>
              <!-- card list item -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!--의료정보 삭제 확인 팝업(Delete버튼)-->
  <!--<pre>{{message}}</pre>-->
  <ng-template #template>
    <div class="modal-body text-center">
      <p>Do you want to confirm?</p>
      <button type="button" class="btn btn-default" (click)="confirm()" >Yes</button>
      <button type="button" class="btn btn-primary" (click)="decline()" >No</button>
    </div>
  </ng-template>
  
  <!--의료정보 수정 팝업 (Edit 버튼)-->
  <div bsModal #editModal="bs-modal" id="my-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true"  [config]="{backdrop: 'static'}">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-body">
          <button type="button" class="close pull-right" aria-label="Close" (click)="editModal.hide()">
            <img src="../../../assets/img/btn-close.png" alt="">
          </button>
          <div class="flexbox enroll-list form-group">
            <!-- card list -->
            <ul class="flex-card-list">
              <!-- card list item -->
              <li class="flex-card-listitem">
                <!-- card module -->
                <div class="flex-card">
                  <!-- image container -->
                  <div class="flex-card-image">
                    <button type="button" class="icon-upload-img"><img src="../../../assets/img/btn-upload-img.png" alt=""></button>
                  </div>
                  <!-- content container -->
                  <div class="flex-card-content">
                    <!--s:form DatePicker포함-->
                    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
                      <ul class="list-in-card flex-medical-list">
                        <li>
                          <label for="date" class="list-title">Date: </label> 
                          <!-- DatePicker -->
                          <input type="text" id="date" class="form-control" placeholder="Datepicker" bsDatepicker formControlName="date">
                          <div class="alert" *ngIf="!myForm.controls['date'].valid && myForm.controls['date'].touched">
                            You need to pick a date
                          </div>
                        </li>
                        <li>
                          <label for="description" class="list-title">Description: </label>
                          <textarea type="text" id="description" class="list-content" formControlName="description"></textarea>
                          <div class="alert" *ngIf="!myForm.controls['description'].valid && myForm.controls['description'].touched">
                            You must specify a description that's between 10 and 100 characters.
                          </div>
                        </li>
                        <li>
                          <label class="list-title">Comment: </label>
                          <textarea class="list-content overflow-scroll" resize="none"></textarea>
                        </li>
                      </ul>
                      <!--button submit-->
                      <div class="btns-in-card">
                        <button type="submit" class="btn btn-radius btn-outline-mint btn-type1-mint" [disabled]="!myForm.invalid">Edit</button>
                      </div>
                    </form>
                    <!--e:form-->
                  </div>
                </div>
              </li>
              <!-- card list item -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--validation view for Testing-->
  <!--
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <pre class="code-preview">{{myForm.value | json}}</pre>
    </div>
  </div>
  -->
  <div>
    {{pet | json}}
  </div>
  `,
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit {
 
  /* http server */
  url: string = 'https://wootari-test-server-dev.ap-northeast-2.elasticbeanstalk.com';
  pet: any;
  // 의료정보 입력폼, Validations
  myForm: FormGroup;

  constructor( 
      private fb: FormBuilder,
      public http: HttpClient,
      private modalService: BsModalService
  ) {
    console.log(this.url);
   }

  get date() {
    return this.myForm.get('date');
  }

  get description() {
    return this.myForm.get('description');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      'date': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(300)])]
    });
    this.http.get(`${this.url}/profile/1/`, { observe: 'response' })
      .subscribe((res) => console.log(res.body));
  }

  onSubmit() {
    console.log(this.myForm);
    this.myForm.reset();
  }

  //삭제 버튼팝업
  modalRef: BsModalRef;
  message: string;

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}
