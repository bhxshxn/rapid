import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';

import { ReportService } from '../../services/report.service';

interface Ads {
   name: string;
}
@Component({
   selector: 'app-report',
   templateUrl: './report.component.html',
   styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
   @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;

   public lineChartData: ChartConfiguration<'line'>['data'];
   public lineChartOptions: ChartOptions<'line'>;
   public lineChartLegend: boolean;
   public lineChartOptions1: any = {
      responsive: true,
      legend: {
         position: 'bottom', // Position the legend at the bottom
      },
   };

   response: any;
   ads: Ads[] = [
      { name: 'ad1' },
      { name: 'ad2' },
      { name: 'ad3' },
      { name: 'ad4' },
   ];
   adsControl = new FormControl('All'); // Set the default ad type to "All"
   date = new FormControl(new Date());
   todayDate = new Date().toISOString().slice(0, 10);
   startDateControl = new FormControl();
   endDateControl = new FormControl();
   constructor(private fb: FormBuilder, private reportService: ReportService) {}
   ngOnInit() {
      // this.response = {
      //    numberOfClicks: {
      //       numberOfClicks: 2,
      //       avg_cost: 5.699999809265137,
      //    },
      //    totalImpressions: {
      //       impression: 2,
      //    },
      //    totalCost: {
      //       cost: 11.399999618530273,
      //       avg_cost: 5.699999809265137,
      //    },
      //    clickedCount: [
      //       {
      //          id: 2,
      //          cost: 39.89999866485596,
      //          ad_id: 11,
      //          ad_type: 'custom_video',
      //          is_clicked: 1,
      //          created_at: '2023-04-16T14:50:34.000Z',
      //          avg_cost: 5.699999809265137,
      //       },
      //       {
      //          id: 17,
      //          cost: 399.39999198913574,
      //          ad_id: 50,
      //          ad_type: 'custom_video',
      //          is_clicked: 1,
      //          created_at: '2023-05-07T12:10:43.000Z',
      //          avg_cost: 5.397297189042375,
      //       },
      //    ],
      //    impressions: [
      //       {
      //          id: 1,
      //          cost: 34.19999885559082,
      //          ad_id: 11,
      //          ad_type: 'custom_video',
      //          is_clicked: 0,
      //          created_at: '2023-04-16T14:34:50.000Z',
      //          avg_cost: 5.699999809265137,
      //       },
      //       {
      //          id: 14,
      //          cost: 11.399999618530273,
      //          ad_id: 50,
      //          ad_type: 'custom_video',
      //          is_clicked: 0,
      //          created_at: '2023-05-03T15:41:49.000Z',
      //          avg_cost: 5.699999809265137,
      //       },
      //       {
      //          id: 16,
      //          cost: 489.2999906539917,
      //          ad_id: 50,
      //          ad_type: 'custom_video',
      //          is_clicked: 0,
      //          created_at: '2023-05-07T12:10:38.000Z',
      //          avg_cost: 5.376922974219689,
      //       },
      //    ],
      // };
      const startDate = this.todayDate;
      const endDate = this.todayDate;
      const adType = this.adsControl.value;
      this.getReportData(startDate, endDate, adType).subscribe(
         data => {
            this.response = data;

            // Update the chart data with the fetched response
            console.log('Reponse', this.response);
            const filteredClickedCount = this.response.clickedCount.map(
               item => {
                  return Math.round(item.cost);
               },
            );
            const filteredImpressionsCount = this.response.impressions.map(
               item => {
                  return Math.round(item.cost);
               },
            );

            const filteredClickedCreated = this.response.clickedCount.map(
               item => {
                  return item.created_at;
               },
            );
            const filteredImpressionsCreated = this.response.clickedCount.map(
               item => {
                  return item.created_at;
               },
            );
            const mergeCreated = [
               ...filteredClickedCreated,
               ...filteredImpressionsCreated,
            ];
            const formattedDates = mergeCreated.map(date =>
               new Date(date).toISOString().slice(0, 10),
            );

            // Step 2: Remove duplicates using Set
            const uniqueDatesSet = new Set(formattedDates);

            // Step 3: Convert Set back to an array
            const uniqueDatesArray = Array.from(uniqueDatesSet);

            this.lineChartData = {
               labels: uniqueDatesArray,
               datasets: [
                  {
                     data: filteredImpressionsCount,
                     label: 'Impressions',
                     fill: true,
                     tension: 0,
                     borderColor: 'red',
                     backgroundColor: 'rgba(255,0,0,0)',
                  },
                  {
                     data: filteredClickedCount,
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
         },
         error => {
            // Handle the error here
         },
      );
   }

   captureGraphAsPDF() {
      // Get the HTML element containing the graph
      const graphElement = this.graphContainer.nativeElement;

      // Use html2canvas to capture the graph as an image
      html2canvas(graphElement).then(canvas => {
         // Convert the canvas to an image data URL
         const imageDataURL = canvas.toDataURL('image/png');

         // Create a new jsPDF instance
         const pdf = new jsPDF();

         // Add the captured image to the PDF document
         pdf.addImage(imageDataURL, 'PNG', 10, 10, 190, 100); // You can adjust the position and size of the image in the PDF

         // Save the PDF
         pdf.save('graph.pdf');
      });
   }
   // getReportData(startDate: any, endDate: any, adType: string) {
   //    this.reportService
   //       .getReport(startDate, endDate, adType)
   //       .subscribe(data => {
   //          this.response = data;
   //          // The rest of your code for updating the chart data based on the response...
   //       });
   // }
   getReportData(startDate: any, endDate: any, adType: string) {
      return this.reportService.getReport(startDate, endDate, adType);
   }
   onFilterChange() {
      const startDate = moment(this.startDateControl.value).format(
         'YYYY-MM-DD',
      );
      const endDate = moment(this.endDateControl.value).format('YYYY-MM-DD');
      const adType = this.adsControl.value;
      console.log('Start', startDate, 'End', endDate);
      // Call getReportData and directly assign the response to the response variable
      this.getReportData(startDate, endDate, adType).subscribe(
         data => {
            this.response = data;

            // Update the chart data with the fetched response
            console.log('Reponse', this.response);
            const filteredClickedCount = this.response.clickedCount.map(
               item => {
                  return Math.round(item.cost);
               },
            );
            const filteredImpressionsCount = this.response.impressions.map(
               item => {
                  return Math.round(item.cost);
               },
            );

            const filteredClickedCreated = this.response.clickedCount.map(
               item => {
                  return item.created_at;
               },
            );
            const filteredImpressionsCreated = this.response.clickedCount.map(
               item => {
                  return item.created_at;
               },
            );
            const mergeCreated = [
               ...filteredClickedCreated,
               ...filteredImpressionsCreated,
            ];
            const formattedDates = mergeCreated.map(date =>
               new Date(date).toISOString().slice(0, 10),
            );

            // Step 2: Remove duplicates using Set
            const uniqueDatesSet = new Set(formattedDates);

            // Step 3: Convert Set back to an array
            const uniqueDatesArray = Array.from(uniqueDatesSet);

            this.lineChartData = {
               labels: uniqueDatesArray,
               datasets: [
                  {
                     data: filteredImpressionsCount,
                     label: 'Impressions',
                     fill: true,
                     tension: 0,
                     borderColor: 'red',
                     backgroundColor: 'rgba(255,0,0,0)',
                  },
                  {
                     data: filteredClickedCount,
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
         },
         error => {
            // Handle the error here
         },
      );
   }
}
