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

import { Category } from 'src/app/models/Category';

import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { BASE_URL } from 'src/config';

@Component({
   selector: 'app-create-category',
   templateUrl: './create-category.component.html',
   styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
   @ViewChild('formDirective') formDirective: NgForm;
   @Output() create: EventEmitter<any> = new EventEmitter();

   title = 'fileUpload';

   categories: Category[];

   createCategoryForm: FormGroup;
   private url = `${BASE_URL}/post`;
   error: string;
   uploadError: string;

   constructor(
      private categoryService: CategoryService,
      private router: Router,
      private fb: FormBuilder
   ) {}

   ngOnInit(): void {
      this.createCategoryForm = this.fb.group({
         name: ['', Validators.required],
         image: [''],
      });
   }

   onSelectedFile(event) {
      if (event.target.files.length > 0) {
         const file = event.target.files[0];
         this.createCategoryForm.get('image').setValue(file);
      }
   }

   get name() {
      return this.createCategoryForm.get('name');
   }

   onSubmit() {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };

      const formData = new FormData();
      formData.append('file', this.createCategoryForm.get('image').value);
      formData.append('name', this.createCategoryForm.get('name').value);

      this.categoryService.createCategory(formData).subscribe(
         (res) => {
            if (res.status === 'error') {
               this.uploadError = res.message;
            } else {
               console.log(res['message']);
               this.router.navigate(['/category']);
            }
         },
         (error) => (this.error = error)
      );
   }
}
