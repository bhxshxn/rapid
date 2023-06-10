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

@Component({
   selector: 'app-adveatiser',
   templateUrl: './adveatiser.component.html',
   styleUrls: ['./adveatiser.component.scss'],
})
export class AdveatiserComponent implements OnInit {
   adveatisers: any[];
   userId: Pick<User, 'id'>;
   displayedColumns: string[] = [
      'id',
      'personal_name',
      'company_name',
      'mobile_number',
      'current_balance',
      'website_link',
      'company_logo',
      'Action',
   ];
   dataSource: MatTableDataSource<any>;

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(
      private adveatiserService: AdveatiserService,
      private router: Router,
      private _snackBar: MatSnackBar
   ) {}

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   ngOnInit(): void {
      this.reloadData();
   }

   reloadData() {
      this.adveatiserService.fetchAll().subscribe(
         (data) => {
            this.adveatisers = data['data'];
            this.dataSource = new MatTableDataSource(this.adveatisers);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         (error) => {
            console.log(error);
         }
      );
   }

   newArticle() {
      this.router.navigate(['adveatiser/create']);
   }

   deleteAdveatiser(id: string) {
      this.adveatiserService.delete(id).subscribe((response) => {
         if (response['success'] === true) {
            this.reloadData();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open('Try again Not Found!', '', { duration: 2000 });
         }
      });
   }

   EditAdveatiser(id) {
      this.router.navigate(['adveatiser/edit/' + id]);
   }

   View(id) {
      this.router.navigate(['adveatiser/view/' + id]);
   }
}
