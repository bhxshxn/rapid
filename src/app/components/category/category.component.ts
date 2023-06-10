import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { User } from 'src/app/models/User';
import { CategoryService } from 'src/app/services/category.service';

@Component({
   selector: 'app-category',
   templateUrl: './category.component.html',
   styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
   categories: Category[];
   userId: Pick<User, 'id'>;

   displayedColumns: string[] = ['#Id', 'Image', 'Name', 'Action'];
   dataSource: MatTableDataSource<Category>;

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(
      private categoryService: CategoryService,
      private router: Router
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
      this.categoryService.fetchAll().subscribe(
         (data) => {
            this.categories = data['data'];
            this.dataSource = new MatTableDataSource(this.categories);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         (error) => {
            console.log(error);
         }
      );
   }

   fetchAll(): Observable<Category[]> {
      return this.categoryService.fetchAll();
   }

   newArticle() {
      this.router.navigate(['create_category']);
   }

   deleteCategory(id: string) {
      this.categoryService.deleteCategory(id).subscribe((data) => {
         window.location.reload();
      });
   }
}
