import { HttpHeaders } from '@angular/common/http';
import {
   Component,
   OnInit,
   Inject,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import {
   FormControl,
   FormGroup,
   Validators,
   FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { General_settingsService } from 'src/app/services/general_settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
   MatDialog,
   MAT_DIALOG_DATA,
   MatDialogRef,
} from '@angular/material/dialog';

@Component({
   selector: 'app-update-setting',
   templateUrl: './update-setting.component.html',
   styleUrls: ['./update-setting.component.scss'],
})
export class UpdateSettingComponent implements OnInit {
   constructor(
      public dialogRef: MatDialogRef<UpdateSettingComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public general_settingsService: General_settingsService,
      private router: Router,
      private fb: FormBuilder,
      private _snackBar: MatSnackBar,
   ) {}
   createForm: FormGroup;
   ngOnInit(): void {
      // if(this.data){
      this.createForm = this.fb.group({
         advertiser_counter: [this.data.advertiser_counter],
         value: [this.data.value],
      });
      // }else{
      //    this.createForm = this.fb.group({
      //       advertiser_counter: [''],
      //       value: [''],
      //    });
      // }
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

   onSubmit() {
      // if (this.data) {
      let payload = {
         id: this.data.id,
         advertiser_counter: this.createForm.get('advertiser_counter').value,
         value: this.createForm.get('value').value,
      };
      this.general_settingsService.update(payload).subscribe(response => {
         if (response['success'] === true) {
            this.onNoClick();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open('Try again Not Found!', '', { duration: 2000 });
         }
      });
      // }
      // else{
      //    let payload = {
      //       advertiser_counter: this.createForm.get('advertiser_counter').value,
      //       value: this.createForm.get('value').value
      //    }
      //    this.general_settingsService.create(payload).subscribe((response) => {
      //       if (response['success'] === true) {
      //          this.onNoClick()
      //          this._snackBar.open(response['message'], '', { duration: 2000 })
      //       }
      //       else {
      //          this._snackBar.open("Try again Not Found!", '', { duration: 2000 })
      //       }
      //    });
      // }
   }
}
