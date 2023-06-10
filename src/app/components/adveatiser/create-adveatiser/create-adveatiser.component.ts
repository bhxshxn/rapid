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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-create-adveatiser',
   templateUrl: './create-adveatiser.component.html',
   styleUrls: ['./create-adveatiser.component.scss'],
})
export class CreateAdveatiserComponent implements OnInit {
   constructor(
      private fb: FormBuilder,
      private adveatiserService: AdveatiserService,
      private router: Router,
      private _snackBar: MatSnackBar,
   ) {}
   createForm: FormGroup;

   ngOnInit(): void {
      this.createForm = this.fb.group({
         personal_name: ['', Validators.required],
         company_name: ['', Validators.required],
         mobile_number: [
            '',
            [
               Validators.required,
               Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            ],
         ],
         website_link: ['', Validators.required],
         company_logo: [''],
         optional_one: [''],
         optional_two: [''],
         current_balance: ['', Validators.required],
      });
   }

   onSelectedFile(event) {
      if (event.target.files.length > 0) {
         const file = event.target.files[0];
         this.createForm.get('company_logo').setValue(file);
      }
   }

   onSubmit() {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };
      const formData = new FormData();
      formData.append(
         'personal_name',
         this.createForm.get('personal_name').value,
      );
      formData.append(
         'company_name',
         this.createForm.get('company_name').value,
      );
      formData.append(
         'mobile_number',
         this.createForm.get('mobile_number').value,
      );
      formData.append(
         'website_link',
         this.createForm.get('website_link').value,
      );
      formData.append(
         'optional_one',
         this.createForm.get('optional_one').value,
      );
      formData.append(
         'optional_two',
         this.createForm.get('optional_two').value,
      );
      formData.append(
         'current_balance',
         this.createForm.get('current_balance').value,
      );
      formData.append(
         'company_logo',
         this.createForm.get('company_logo').value,
      );

      this.adveatiserService.create(formData).subscribe(response => {
         if (response['success'] === true) {
            this.router.navigate(['adveatiser']);
            this.createForm.reset();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open(response['message'], '', { duration: 2000 });
         }
      });
   }
}
