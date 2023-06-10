import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
   selector: 'app-post-detail',
   templateUrl: './post-detail.component.html',
   styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
   article: Post;
   constructor(
      private postService: PostService,
      private actRoute: ActivatedRoute
   ) {}

   ngOnInit(): void {
      this.postService.fetchById(this.actRoute.snapshot.params['id']).subscribe(
         (data) => {
            // console.log(data);
            this.article = data[0];

            console.log(this.article);
         },
         (error) => {
            console.log(error);
         }
      );
   }

   fetchById(): Observable<Post[]> {
      return this.postService.fetchById(this.actRoute.snapshot.params['id']);
   }
}
