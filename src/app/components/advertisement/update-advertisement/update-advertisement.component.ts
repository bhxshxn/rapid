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
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
   MatDialog,
   MAT_DIALOG_DATA,
   MatDialogRef,
} from '@angular/material/dialog';

@Component({
   selector: 'app-update-advertisement',
   templateUrl: './update-advertisement.component.html',
   styleUrls: ['./update-advertisement.component.scss'],
})
export class UpdateAdvertisementComponent implements OnInit {
   ngOnInit(): void {}

   constructor(
      public dialogRef: MatDialogRef<UpdateAdvertisementComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public advertisementService: AdvertisementService,
      private router: Router,
      private _snackBar: MatSnackBar,
   ) {}

   onNoClick(): void {
      this.dialogRef.close();
   }

   onSubmit(val) {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };
      let payload = {
         id: this.data.id,
         cost_per_impression: val,
      };
      this.advertisementService.Update(payload).subscribe(response => {
         if (response['success'] === true) {
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open('Try again Not Found!', '', { duration: 2000 });
         }
      });
   }
}
