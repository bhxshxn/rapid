import { HttpHeaders } from '@angular/common/http';
import {
   Component,
   OnInit,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import {
   FormControl,
   FormGroup,
   Validators,
   NgForm,
   FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdveatiserService } from 'src/app/services/adveatiser.service';
// import { Adveatisers } from 'src/app/models/adveatisers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-edit-adveatiser',
   templateUrl: './edit-adveatiser.component.html',
   styleUrls: ['./edit-adveatiser.component.scss'],
})
export class EditAdveatiserComponent implements OnInit {
   constructor(
      private fb: FormBuilder,
      private adveatiserService: AdveatiserService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private actRoute: ActivatedRoute,
   ) {}
   UpdateForm: FormGroup;
   editData: any;
   imageEdit = null;
   defaultImage = [];
   ngOnInit(): void {
      this.adveatiserService
         .edit(this.actRoute.snapshot.params['id'])
         .subscribe(res => {
            this.editData = res.data[0];
            this.imageEdit = this.editData.company_logo;
            this.defaultImage.push(this.imageEdit);
            this.UpdateForm = this.fb.group({
               personal_name: [
                  this.editData.personal_name,
                  [Validators.required],
               ],
               company_name: [
                  this.editData.company_name,
                  [Validators.required],
               ],
               mobile_number: [
                  this.editData.mobile_number,
                  [
                     Validators.required,
                     Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
                  ],
               ],
               website_link: [
                  this.editData.website_link,
                  [Validators.required],
               ],
               optional_one: [this.editData.optional_one],
               optional_two: [this.editData.optional_two],
               current_balance: [
                  this.editData.current_balance,
                  [Validators.required],
               ],
               company_logo: [''],
            });
         });
   }

   onSelectedFile(event) {
      if (event.target.files.length > 0) {
         const file = event.target.files[0];
         this.UpdateForm.get('company_logo').setValue(file);
      }
   }

   UpdateData() {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };
      const formData = new FormData();

      formData.append(
         'company_logo',
         this.UpdateForm.get('company_logo').value
            ? this.UpdateForm.get('company_logo').value
            : this.defaultImage[0],
      );
      formData.append('id', this.actRoute.snapshot.params['id']);
      formData.append(
         'personal_name',
         this.UpdateForm.get('personal_name').value,
      );
      formData.append(
         'company_name',
         this.UpdateForm.get('company_name').value,
      );
      formData.append(
         'mobile_number',
         this.UpdateForm.get('mobile_number').value,
      );
      formData.append(
         'website_link',
         this.UpdateForm.get('website_link').value,
      );
      formData.append(
         'optional_one',
         this.UpdateForm.get('optional_one').value,
      );
      formData.append(
         'optional_two',
         this.UpdateForm.get('optional_two').value,
      );
      formData.append(
         'current_balance',
         this.UpdateForm.get('current_balance').value,
      );

      this.adveatiserService.UpdateAdveatiser(formData).subscribe(response => {
         if (response['success'] === true) {
            this.router.navigate(['adveatiser']);
            this.UpdateForm.reset();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open(response['message'], '', { duration: 2000 });
         }
      });
   }
}
