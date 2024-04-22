import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Contact, ContactType, ContactTypeIcon, RequestStore, StoreDetails } from '../../../../model/store';
import { debounceTime, filter, switchMap, timeout } from 'rxjs';
import { SharedService } from '../../../../service/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ViaCepDetails } from '../../../../model/shared';
import { NgxMaskDirective } from 'ngx-mask';
import { cnpjValidator } from '../../../../core/configs/Validators';
import { StoreManagementService } from '../../../../service/store-management.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-store-form',
  standalone: true,
  imports: [PageTitleComponent, ReactiveFormsModule, FormsModule, MatProgressSpinnerModule, NgxMaskDirective],
  templateUrl: './store-form.component.html',
  styleUrl: './store-form.component.scss'
})
export class StoreFormComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  submit: boolean;
  icons = ContactTypeIcon;
  storeId?: number;

  @ViewChild("typeSelect") typeSelect: ElementRef;
  @ViewChild("addressNumberInput") addressNumberInput: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly sharedService: SharedService,
    private readonly toastr: ToastrService,
    private readonly storeManagementService: StoreManagementService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { 
    this.storeId = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      legalName: ['', [Validators.required]],
      cnpj: ['', [cnpjValidator()]],
      logoUrl: [''],
      zipCode: ['', [Validators.required]],
      state: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      district: [{ value: '', disabled: true }],
      addressStreet: [{ value: '', disabled: true }],
      addressNumber: ['', [Validators.required]],
      contactId: [undefined],
      contactType: [''],
      contactValue: [''],
      contacts: this.fb.array([], Validators.required)
    });

    this.initStore();

    this.onChangeZipCode();
  }

  private initStore(): void {
    if(!this.storeId){
      return;
    }
    this.loading = true;
    this.storeManagementService.getStoreDetails(this.storeId).subscribe({
      next: resp => this.fillStoreForm(resp)
    }).add(() => this.loading = false);

  }

  private fillStoreForm(store: StoreDetails){
    this.form.patchValue({
      id: store.id,
      legalName: store.legalName,
      cnpj: store.cnpj,
      logoUrl: store.logoUrl,
      zipCode: store.zipCode,
      state: store.state,
      city: store.city,
      district: store.district,
      addressStreet: store.addressStreet,
      addressNumber: store.addressNumber
    });

    this.fillContactFormArray(store.contacts);
  }

  private fillContactFormArray(contacts: Contact[]) {
    const contactFormArray = this.form.get('contacts') as FormArray;
    contacts.forEach(contact => {
      contactFormArray.push(this.createContactFormGroup(contact));
    });
  }

  private createContactFormGroup(contact: Contact): FormGroup {
    return this.fb.group({
      id: [contact.id],
      type: [contact.type],
      value: [contact.value]
    });
  }

  private onChangeZipCode(): void {
    this.form.get("zipCode")?.valueChanges.pipe(
      debounceTime(400),
      filter(value => !!value && value.length > 7),
      switchMap(value => this.sharedService.searchZipCodeInfo(value))
    ).subscribe({
      next: resp => this.updateAddressInfo(resp),
      error: error => {
        this.toastr.error("Erro ao buscar o cep");
        console.error(error);
      }
    })
  }

  updateAddressInfo(detail: ViaCepDetails): void {
    this.state?.setValue(detail.uf);
    this.city?.setValue(detail.localidade);
    this.district?.setValue(detail.bairro);
    this.addressStreet?.setValue(detail.logradouro);

    this.addressNumberInput.nativeElement.focus();
  }

  onSubmit(): void {
    this.submit = true;
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    const req = this.form.getRawValue() as RequestStore;
    this.loading = true;

    if(!this.storeId){
      this.createStore(req);
    }else{
      this.updateStore(req);
    }
    
  }

  private createStore(req: RequestStore): void {
    this.storeManagementService.createStore(req).subscribe({
      next: () => {
        this.toastr.success("Criada com sucesso");
        this.router.navigateByUrl("/admin/store/list");
      }
    }).add(() => this.loading = false);
  }

  private updateStore(req: RequestStore): void {
    this.storeManagementService.updateStore(req).subscribe({
      next: () => {
        this.toastr.success("Atualizada com sucesso");
        this.router.navigateByUrl("/admin/store/list");
      }
    }).add(() => this.loading = false);
  }

  changeContact(): void {
    if (!this.contactType?.value || this.contactType?.value === 'undefined' || !this.contactValue?.value) {
      if (!this.contactType?.value || this.contactType?.value === 'undefined') {
        this.contactType?.markAsPending();
      }

      if (!this.contactValue?.value) {
        this.contactValue?.markAsPending();
      }

      setTimeout(() => {
        this.contactType?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        this.contactValue?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      }, 1500);

      return;
    }
    this.addContact();
  }

  private addContact(): void {
    const type = this.contactType?.value;
    const value = this.contactValue?.value;
    const id = this.contactId?.value;

    const contacts = this.form.get("contacts") as FormArray;

    contacts.push(this.fb.group({
      id: id,
      type: type,
      value: value,
      disabled: false
    }));

    this.contactId?.reset();
    this.contactValue?.reset();
    this.contactType?.reset();
  }

  selectContact(contact: AbstractControl): void {
    this.contactType?.patchValue(contact.get("type")?.value);
    this.contactValue?.patchValue(contact.get("value")?.value);
    this.contactId?.patchValue(contact.get("id")?.value);

    this.typeSelect.nativeElement.focus();
  }

  removeContact(index: number, contact: AbstractControl) {
    if (contact.get("id") && contact.get("id")?.value) {
      contact.get("disabled")?.setValue(true);
    } else {
      this.contacts.removeAt(index);
    }
  }

  get legalName() {
    return this.form.get("legalName");
  }

  get cnpj() {
    return this.form.get("cnpj");
  }

  get logoUrl() {
    return this.form.get("logoUrl");
  }

  get contactType() {
    return this.form.get("contactType");
  }

  get contactValue() {
    return this.form.get("contactValue");
  }

  get contactId() {
    return this.form.get("contactId");
  }

  get contacts() {
    return this.form.get("contacts") as FormArray;
  }

  get state() {
    return this.form.get("state");
  }

  get city() {
    return this.form.get("city");
  }

  get district() {
    return this.form.get("district");
  }

  get addressStreet() {
    return this.form.get("addressStreet");
  }

}
