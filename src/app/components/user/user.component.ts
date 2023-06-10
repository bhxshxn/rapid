import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
   selector: 'app-user',
   templateUrl: './user.component.html',
   styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
   posts: User[];
   userId: Pick<User, 'id'>;

   displayedColumns: string[] = ['#Id', 'Image', 'Name', 'Email'];
   dataSource: MatTableDataSource<User>;

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(private authService: AuthService, private router: Router) {}

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
      this.authService.fetchAll().subscribe(
         (data) => {
            this.posts = data['data'];
            this.dataSource = new MatTableDataSource(this.posts);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         (error) => {
            console.log(error);
         }
      );
   }

   fetchAll(): Observable<User[]> {
      return this.authService.fetchAll();
   }

   newUser() {
      this.router.navigate(['/create_user']);
   }
}
