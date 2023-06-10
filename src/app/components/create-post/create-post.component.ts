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

import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/Category';

import { Post } from 'src/app/models/Post';

import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { BASE_URL } from 'src/config';

@Component({
   selector: 'app-create-post',
   templateUrl: './create-post.component.html',
   styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
   @ViewChild('formDirective') formDirective: NgForm;
   @Output() create: EventEmitter<any> = new EventEmitter();

   title = 'fileUpload';

   categories: Category[];

   uploadForm: FormGroup;
   private url = `${BASE_URL}/post`;
   error: string;
   uploadError: string;
   private catName: string;
   private i: number;
   notificationValue: string;
   trending_expires_at_value:string;
   constructor(
      private authService: AuthService,
      private categoryService: CategoryService,
      private postService: PostService,
      private router: Router,
      private fb: FormBuilder
   ) {  }

   ngOnInit(): void {
      this.categoryService.fetchAll().subscribe(
         (data) => {
            this.categories = data['data'];
         },
         (error) => {
            console.log(error);
         }
      );

      this.uploadForm = this.fb.group({
         headline: ['', Validators.required],
         link: ['', Validators.required],
         videolink:[''],
         body: ['', Validators.required],
         category: ['1'],
         image: [''],
         notificaion: [''],
         author: [''],
         trending_expires_at: [''],
      });
   }

   onSelectedFile(event) {
      if (event.target.files.length > 0) {
         const file = event.target.files[0];
         this.uploadForm.get('image').setValue(file);
      }
   }

   get headline() {
      return this.uploadForm.get('headline');
   }

   get link() {
      return this.uploadForm.get('link');
   }

   get videolink() {
      return this.uploadForm.get('videolink');
   }

   get body() {
      return this.uploadForm.get('body');
   }

   get category() {
      return this.uploadForm.get('category');
   }

   get notification() {
      return this.uploadForm.get('notification');
   }
   get author() {
      return this.uploadForm.get('author');
   }
   get trending_expires_at() {
      return this.uploadForm.get('trending_expires_at');
   }

   onSubmit() {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };

      const formData = new FormData();

      this.i = this.categories.findIndex(
         (x) => x.id === this.uploadForm.get('category').value
      );

      this.catName = this.categories[this.i].name;

      formData.append('file', this.uploadForm.get('image').value);
      formData.append('headline', this.uploadForm.get('headline').value);
      formData.append('link', this.uploadForm.get('link').value);
      formData.append('embedded_url', this.uploadForm.get('videolink').value);
      formData.append('body', this.uploadForm.get('body').value);
      formData.append('cat_id', this.uploadForm.get('category').value);
      formData.append('author', this.uploadForm.get('author').value);
      formData.append('notification', this.notificationValue);
      formData.append(
         'trending_expires_at',
         this.trending_expires_at_value
      );

      formData.append('category_name', this.catName);

      this.postService.createBlog(formData).subscribe(
         (res) => {
            if (res.status === 'error') {
               this.uploadError = res.message;
            } else {
               console.log(res['message']);
               this.router.navigate(['/posts']);
            }
         },
         (error) => (this.error = error)
      );
   }

   changedValue(notifications) {
      console.log(notifications);
      this.notificationValue = notifications;
   }
   changedValuetwo(trending_expires_at) {
      console.log(trending_expires_at);
      this.trending_expires_at_value = trending_expires_at;
   }
}
