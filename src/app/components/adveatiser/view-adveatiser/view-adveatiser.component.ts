import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Adveatisers } from 'src/app/models/adveatisers';
import { User } from 'src/app/models/User';
import { CategoryService } from 'src/app/services/category.service';
import { AdveatiserService } from 'src/app/services/adveatiser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
// import { View } from 'src/app/models/advertisement_view';

@Component({
   selector: 'app-view-adveatiser',
   templateUrl: './view-adveatiser.component.html',
   styleUrls: ['./view-adveatiser.component.scss'],
})
export class ViewAdveatiserComponent implements OnInit {
   adveatisers: any[];
   userId: Pick<User, 'id'>;
   displayedColumns: string[] = ['id', 'amount', 'created_at'];
   dataSource: MatTableDataSource<any>;

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(
      private adveatiserService: AdveatiserService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private actRoute: ActivatedRoute,
   ) {}

   ngOnInit(): void {
      this.reloadData();
      console.log('--', this.actRoute.snapshot.params['id']);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   reloadData() {
      this.adveatiserService
         .view(this.actRoute.snapshot.params['id'])
         .subscribe(
            data => {
               this.adveatisers = data['data'];
               this.dataSource = new MatTableDataSource(this.adveatisers);
            },
            error => {
               console.log(error);
            },
         );
   }
}
