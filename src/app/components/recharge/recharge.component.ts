import { HttpHeaders } from '@angular/common/http';
import {
   Component,
   OnInit,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { Recharge } from 'src/app/models/recharge';
import { RechargeService } from 'src/app/services/recharge.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-recharge',
   templateUrl: './recharge.component.html',
   styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {
   @ViewChild('formDirective') formDirective: NgForm;
   @Output() create: EventEmitter<any> = new EventEmitter();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   displayedColumns = ['Id', 'name', 'amount', 'Action'];

   title = 'fileUpload';
   dataSource: MatTableDataSource<any>;
   Recharges: any[];

   uploadForm: FormGroup;
   error: string;
   uploadError: string;
   constructor(
      private rechargeService: RechargeService,
      private router: Router,
      private _snackBar: MatSnackBar,
   ) {}

   ngOnInit(): void {
      this.getData();
   }

   getData() {
      this.rechargeService.fetchAll().subscribe(
         data => {
            this.Recharges = data.data;
            console.log({ data: this.Recharges });
            this.dataSource = new MatTableDataSource(this.Recharges);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         error => {
            console.log(error);
         },
      );
   }

   CreateNew() {
      this.router.navigate(['recharge/create']);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   Edit(id) {
      this.router.navigate(['recharge/edit/' + id]);
   }

   deleted(id) {
      this.rechargeService.delete(id).subscribe(response => {
         if (response['success'] === true) {
            this.getData();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open('Try again Not Found!', '', { duration: 2000 });
         }
      });
   }
}
