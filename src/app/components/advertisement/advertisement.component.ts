import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
// import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ViewComponent } from './view/view.component';
import { UpdateAdvertisementComponent } from './update-advertisement/update-advertisement.component';

@Component({
   selector: 'app-advertisement',
   templateUrl: './advertisement.component.html',
   styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
   advertisement: any[];
   dialogValue: string;
   sendValue: string;

   displayedColumns: string[] = [
      'id',
      'title',
      'cost_per_impression',
      'description',
      'type_of_add',
      'Action',
   ];
   // displayedColumns: string[] = ['id', 'title', 'cost_per_impression', 'link','description','type_of_add','artical_logo','video_link','main_image','Action'];
   dataSource: MatTableDataSource<any>;
   hide: false;
   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(
      private advertisementService: AdvertisementService,
      private router: Router,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
   ) {}

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   ngOnInit(): void {
      this.getData();
   }

   getData() {
      this.advertisementService.fetchAll().subscribe(
         res => {
            this.advertisement = res.data;
            this.dataSource = new MatTableDataSource(this.advertisement);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         error => {
            console.log(error);
         },
      );
   }

   newArticle() {
      this.router.navigate(['advertisement/create']);
   }

   openEdit(data: string) {
      const dialogRef = this.dialog.open(UpdateAdvertisementComponent, {
         data: data,
      });

      dialogRef.afterClosed().subscribe(result => {
         this.getData();
      });
   }

   deleted(id: string) {
      this.advertisementService.delete(id).subscribe(response => {
         if (response['success'] === true) {
            this.getData();
            this._snackBar.open(response['message'], '', { duration: 2000 });
         } else {
            this._snackBar.open('Try again Not Found!', '', { duration: 2000 });
         }
      });
   }

   View(data) {
      const dialogRef = this.dialog.open(ViewComponent, {
         data: data,
      });
   }
}
