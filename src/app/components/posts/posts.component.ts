import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
   selector: 'app-posts',
   templateUrl: './posts.component.html',
   styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
   posts: Post[];
   userId: Pick<User, 'id'>;

   displayedColumns: string[] = [
      '#Id',
      'Category',
      'Image',
      'Title',
      'Link',
      'Likes',
      'Action',
   ];
   dataSource: MatTableDataSource<Post>;

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   constructor(
      private postService: PostService,
      private authService: AuthService,
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
      this.postService.fetchAll().subscribe(
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

   fetchAll(): Observable<Post[]> {
      return this.postService.fetchAll();
   }

   newArticle() {
      this.router.navigate(['create_article']);
   }

   viewArticle(id: string) {
      if (id === '') {
         console.log('=====Id Blank=======');
      } else {
         console.log('=====Id Found======= ' + id);
         this.router.navigate(['article' + '/' + id]);
      }
   }

   deleteArticle(id: string) {
      this.postService.deleteArticle(id).subscribe((data) => {
         window.location.reload();
      });
   }
}
