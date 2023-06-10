import { HttpHeaders } from '@angular/common/http';
import {
   Component,
   OnInit,
   Inject,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import {
   FormControl,
   FormGroup,
   Validators,
   FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
   MatDialog,
   MAT_DIALOG_DATA,
   MatDialogRef,
} from '@angular/material/dialog';
import { AdveatiserService } from 'src/app/services/adveatiser.service';
// import { Adveatisers } from 'src/app/models/adveatisers';

@Component({
   selector: 'app-create-advertisement',
   templateUrl: './create-advertisement.component.html',
   styleUrls: ['./create-advertisement.component.scss'],
})
export class CreateAdvertisementComponent implements OnInit {
   adveatisersData: any[];
   ngOnInit(): void {
      this.getadveatiser();
      this.createForm = this.fb.group({
         adveatiser_Id: ['', Validators.required],
         title: ['', Validators.required],
         cost_per_impression: ['', Validators.required],
         link: [''],
         type_of_add: ['', Validators.required],
         video_link: [''],
         article_logo: [''],
         description: ['', Validators.required],
      });
   }

   constructor(
      public advertisementService: AdvertisementService,
      private fb: FormBuilder,
      private router: Router,
      private _snackBar: MatSnackBar,
      private adveatiserService: AdveatiserService,
   ) {}
   createForm: FormGroup;
   artical_logoShow: boolean = false;
   single_imageShow: boolean = false;
   magazine_imageShow: boolean = false;
   youtube_videoShow: boolean = false;
   custom_videoShow: boolean = false;
   arrayOfFiles: [];
   imageUP: string;
   imageOrvideoSingal: string;
   getadveatiser() {
      this.adveatiserService.fetchAll().subscribe(
         data => {
            this.adveatisersData = data['data'];
         },
         error => {
            console.log(error);
         },
      );
   }

   onTypeChange(ob) {
      let selectedType = ob.value;
      if (selectedType === 'article_logo') {
         this.single_imageShow = false;
         this.magazine_imageShow = false;
         this.youtube_videoShow = false;
         this.custom_videoShow = false;
         this.artical_logoShow = !this.artical_logoShow;
      } else if (selectedType === 'single_image') {
         this.artical_logoShow = false;
         this.magazine_imageShow = false;
         this.youtube_videoShow = false;
         this.custom_videoShow = false;
         this.single_imageShow = !this.single_imageShow;
      } else if (selectedType === 'magazine_image') {
         this.artical_logoShow = false;
         this.single_imageShow = false;
         this.youtube_videoShow = false;
         this.custom_videoShow = false;
         this.magazine_imageShow = !this.magazine_imageShow;
      } else if (selectedType === 'youtube_video') {
         this.artical_logoShow = false;
         this.single_imageShow = false;
         this.magazine_imageShow = false;
         this.custom_videoShow = false;
         this.youtube_videoShow = !this.youtube_videoShow;
      } else if (selectedType === 'custom_video') {
         this.artical_logoShow = false;
         this.single_imageShow = false;
         this.magazine_imageShow = false;
         this.youtube_videoShow = false;
         this.custom_videoShow = !this.custom_videoShow;
      }
   }

   onSelectedFileSingalimageOrvideo(event) {
      if (event.target.files.length > 0) {
         this.imageOrvideoSingal = event.target.files[0];
      }
   }

   onSelectedFileSingal(event) {
      if (event.target.files.length > 0) {
         this.imageUP = event.target.files[0];
      }
   }

   onSelectedFileMagazine(event: any) {
      this.arrayOfFiles = event.target.files;
   }

   onSelectedFilecustom_video(event: any) {
      console.log('file------', event.target.files);
      this.arrayOfFiles = event.target.files;
   }

   onSubmit() {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data', // 👈
         }),
      };

      const formData = new FormData();
      formData.append('title', this.createForm.get('title').value);
      formData.append(
         'adveatiser_Id',
         this.createForm.get('adveatiser_Id').value,
      );
      formData.append(
         'cost_per_impression',
         this.createForm.get('cost_per_impression').value,
      );
      formData.append('link', this.createForm.get('link').value);
      formData.append('video_link', this.createForm.get('video_link').value);
      formData.append('type_of_add', this.createForm.get('type_of_add').value);
      formData.append('description', this.createForm.get('description').value);

      //  magazine_image
      if (this.createForm.get('type_of_add').value === 'magazine_image') {
         for (const file of this.arrayOfFiles) {
            formData.append('magazine_image', file);
         }
         this.advertisementService
            .magazineType(formData)
            .subscribe(response => {
               if (response['success'] === true) {
                  this.router.navigate(['advertisement']);
                  this.createForm.reset();
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               } else {
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               }
            });
      }

      if (this.createForm.get('type_of_add').value === 'custom_video') {
         for (const file of this.arrayOfFiles) {
            formData.append('custom_video_image', file);
         }
         this.advertisementService
            .custom_videoType(formData)
            .subscribe(response => {
               if (response['success'] === true) {
                  this.router.navigate(['advertisement']);
                  this.createForm.reset();
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               } else {
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               }
            });
      }

      if (this.createForm.get('type_of_add').value === 'single_image') {
         formData.append('single_image', this.imageUP);
         this.advertisementService.singalType(formData).subscribe(response => {
            if (response['success'] === true) {
               this.router.navigate(['advertisement']);
               this.createForm.reset();
               this._snackBar.open(response['message'], '', { duration: 2000 });
            } else {
               this._snackBar.open(response['message'], '', { duration: 2000 });
            }
         });
      }

      if (this.createForm.get('type_of_add').value === 'youtube_video') {
         formData.append('youtube_video', this.imageUP);
         this.advertisementService
            .youtube_videoType(formData)
            .subscribe(response => {
               if (response['success'] === true) {
                  this.router.navigate(['advertisement']);
                  this.createForm.reset();
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               } else {
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               }
            });
      }

      if (this.createForm.get('type_of_add').value === 'article_logo') {
         formData.append('artical_logo', this.imageUP);
         formData.append('mypic', this.imageOrvideoSingal);
         this.advertisementService
            .articallogoType(formData)
            .subscribe(response => {
               if (response['success'] === true) {
                  this.router.navigate(['advertisement']);
                  this.createForm.reset();
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               } else {
                  this._snackBar.open(response['message'], '', {
                     duration: 2000,
                  });
               }
            });
      }
   }
}
