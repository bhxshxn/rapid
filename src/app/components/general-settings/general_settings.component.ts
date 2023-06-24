import { HttpHeaders } from '@angular/common/http';
import {
   Component,
   OnInit,
   ViewChild,
   Output,
   EventEmitter,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { General_settings } from 'src/app/models/general_settings';
import { General_settingsService } from 'src/app/services/general_settings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateSettingComponent } from './update-setting/update-setting.component';

@Component({
   selector: 'app-general_settings',
   templateUrl: './general_settings.component.html',
   styleUrls: ['./general_settings.component.scss'],
})
export class General_settingsComponent implements OnInit {
   @ViewChild('formDirective') formDirective: NgForm;
   @Output() create: EventEmitter<any> = new EventEmitter();

   @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;

   displayedColumns = ['Id', 'advertiser_counter', 'value', 'Action'];

   title = 'fileUpload';
   dataSource: MatTableDataSource<any>;
   General_settingsData: any[];

   constructor(
      private settingService: General_settingsService,
      private router: Router,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
   ) {}

   ngOnInit(): void {
      this.getData();
   }

   getData() {
      this.settingService.fetchAll().subscribe(
         data => {
            this.General_settingsData = data.data;
            this.dataSource = new MatTableDataSource(this.General_settingsData);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
         },
         error => {
            console.log(error);
         },
      );
   }

   CreateNew() {
      this.dialog.open(UpdateSettingComponent);
   }

   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }

   openEdit(data: string) {
      const dialogRef = this.dialog.open(UpdateSettingComponent, {
         data: data,
      });

      dialogRef.afterClosed().subscribe(result => {
         this.getData();
      });
   }
}
