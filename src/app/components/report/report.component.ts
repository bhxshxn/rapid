import { Component, OnInit } from '@angular/core';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

interface Ads {
   name: string;
}
@Component({
   selector: 'app-report',
   templateUrl: './report.component.html',
   styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
   public lineChartData: ChartConfiguration<'line'>['data'];
   public lineChartOptions: ChartOptions<'line'>;
   public lineChartLegend: boolean;
   public lineChartOptions1: any = {
      responsive: true,
      legend: {
         position: 'bottom', // Position the legend at the bottom
      },
   };
   constructor(private fb: FormBuilder) {}

   ngOnInit() {
      this.lineChartData = {
         labels: [
            '2022-05-10',
            '2022-05-11',
            '2022-05-12',
            '2022-05-13',
            '2022-05-14',
            '2022-05-15',
            '2022-05-16',
            '2022-05-17',
         ],
         datasets: [
            {
               data: [467, 576, 572, 79, 92, 574, 573, 576],
               label: 'Impressions',
               fill: true,
               tension: 0,
               borderColor: 'red',
               backgroundColor: 'rgba(255,0,0,0)',
            },
            {
               data: [542, 542, 536, 327, 17, 0.0, 538, 541],
               label: 'Clicks',
               fill: true,
               tension: 0,
               borderColor: 'green',
               backgroundColor: 'rgba(0,0,0,0)',
            },
         ],
      };
      this.lineChartOptions = {
         responsive: false,
      };

      this.lineChartLegend = true;
   }
   adsControl = new FormControl(null);
   selectFormControl = new FormControl('');
   ads: Ads[] = [
      { name: 'ad1' },
      { name: 'ad2' },
      { name: 'ad3' },
      { name: 'ad4' },
   ];
   date = new FormControl(new Date());
   serializedDate = new FormControl(new Date().toISOString());
}
