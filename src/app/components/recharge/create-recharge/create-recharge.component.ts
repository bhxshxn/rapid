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
import { RechargeService } from 'src/app/services/recharge.service';
import { AdveatiserService } from 'src/app/services/adveatiser.service';
// import { Adveatisers } from 'src/app/models/adveatisers';
// import { Recharge } from 'src/app/models/Recharge';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-create-recharge',
   templateUrl: './create-recharge.component.html',
   styleUrls: ['./create-recharge.component.scss'],
})
export class CreateRechargeComponent implements OnInit {
   constructor(
      private fb: FormBuilder,
      private rechargeService: RechargeService,
      private adveatiserService: AdveatiserService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private actRoute: ActivatedRoute,
   ) {}
   createForm: FormGroup;
   adveatisers: [];
   adveatisersData: any[];
   rechargeData: any;
   actionBtn = 'Submit';

   ngOnInit(): void {
      const editId = this.actRoute.snapshot.params['id'];
      if (editId) {
         this.actionBtn = 'Update';
         this.editData(editId);
      }

      this.getadveatiser();
      this.createForm = this.fb.group({
         adveatiser_Id: ['', Validators.required],
         amount: ['', Validators.required],
      });
   }

   getadveatiser() {
      this.adveatiserService.fetchAll().subscribe(
         data => {
            this.adveatisersData = data['data'];
         },
         error => {
            console.log(error);
         },
      );
   }

   editData(id) {
      this.rechargeService.edit(id).subscribe(
         res => {
            this.rechargeData = res.data[0];
            this.createForm = this.fb.group({
               adveatiser_Id: [this.rechargeData.adveatiser_Id],
               amount: [this.rechargeData.amount, Validators.required],
            });
         },
         error => {
            console.log(error);
         },
      );
   }

   onSubmit() {
      const httpOptions = {
         headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
      };
      if (this.actRoute.snapshot.params['id']) {
         let payload = {
            id: this.actRoute.snapshot.params['id'],
            adveatiser_Id: this.createForm.get('adveatiser_Id').value,
            amount: this.createForm.get('amount').value,
         };
         this.updateFrom(payload);
      } else {
         let payload = {
            adveatiser_Id: this.createForm.get('adveatiser_Id').value,
            amount: this.createForm.get('amount').value,
         };
         this.rechargeService.create(payload).subscribe(response => {
            if (response['success'] === true) {
               this.createForm.reset();
               this.router.navigate(['recharge']);
               this._snackBar.open(response['message'], '', { duration: 2000 });
            } else {
               this.createForm.reset();
               this._snackBar.open(response['message'], '', { duration: 2000 });
            }
         });
      }
   }

   updateFrom(params) {
      this.rechargeService.update(params).subscribe(response => {
         if (response['success'] === true) {
            this.createForm.reset();
            this.router.navigate(['recharge']);
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open(response['message'], '', { duration: 2000 });
         }
      });
   }
}
