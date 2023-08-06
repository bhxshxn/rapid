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
import { AdvertisementService } from 'src/app/services/advertisement.service';

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
   ads: Ads[] = [];
   adsControl = new FormControl('All'); // Set the default ad type to "All"
   date = new FormControl(new Date());
   todayDate = new Date().toISOString().slice(0, 10);
   startDate = new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .slice(0, 10);

   endDate = this.todayDate;
   startDateControl = new FormControl(this.startDate);
   endDateControl = new FormControl(this.endDate);
   constructor(
      private fb: FormBuilder,
      private reportService: ReportService,
      private advertisement: AdvertisementService,
   ) {}
   ngOnInit() {
      const adId = this.adsControl.value;
      this.getReportData(this.startDate, this.endDate).subscribe(data => {
         this.response = data;

         // Update the chart data with the fetched response
         //    const filteredClickedCount = this.response.clickedCount.map(
         //       item => {
         //          return Math.round(item.numberOfClicks);
         //       },
         //    );
         //    const filteredImpressionsCount = this.response.impressions.map(
         //       item => {
         //          return Math.round(item.impression);
         //       },
         //    );

         //    const filteredClickedCreated = this.response.clickedCount.map(
         //       item => {
         //          return item.created_at;
         //       },
         //    );
         //    const filteredImpressionsCreated = this.response.clickedCount.map(
         //       item => {
         //          return item.created_at;
         //       },
         //    );
         //    const mergeCreated = [
         //       // ...filteredClickedCreated,
         //       ...filteredImpressionsCreated,
         //    ];
         //    const formattedDates = mergeCreated.map(date =>
         //       new Date(date).toISOString().slice(0, 10),
         //    );

         //    // Step 2: Remove duplicates using Set
         //    const uniqueDatesSet = new Set(formattedDates);

         //    // Step 3: Convert Set back to an array
         //    const uniqueDatesArray = Array.from(uniqueDatesSet);

         //    this.lineChartData = {
         //       labels: uniqueDatesArray,
         //       datasets: [
         //          {
         //             data: filteredImpressionsCount,
         //             label: 'Impressions',
         //             fill: true,
         //             tension: 0,
         //             borderColor: 'red',
         //             backgroundColor: 'rgba(255,0,0,0)',
         //          },
         //          {
         //             data: filteredClickedCount,
         //             label: 'Clicks',
         //             fill: true,
         //             tension: 0,
         //             borderColor: 'green',
         //             backgroundColor: 'rgba(0,0,0,0)',
         //          },
         //       ],
         //    };
         //    this.lineChartOptions = {
         //       responsive: false,
         //    };

         //    this.lineChartLegend = true;
         // },
         // error => {
         //    // Handle the error here
      });
      this.getAdType().subscribe(data => {
         this.ads = data.data;
      });
      this.onFilterChange();
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

   getReportData(startDate: any, endDate: any, adId?: string) {
      return this.reportService.getReport(startDate, endDate, adId);
   }

   getAdType() {
      return this.advertisement.fetchAll();
   }

   onFilterChange() {
      const startDate = moment(this.startDateControl.value).format(
         'YYYY-MM-DD',
      );
      const endDate = moment(this.endDateControl.value).format('YYYY-MM-DD');
      const adId = this.adsControl.value;
      // Call getReportData and directly assign the response to the response variable
      this.getReportData(startDate, endDate, adId).subscribe(
         data => {
            this.response = data;

            // Update the chart data with the fetched response
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
            const filteredImpressionsCreated = this.response.impressions.map(
               item => {
                  return item.created_at;
               },
            );
            const mergeCreated = [
               // ...filteredClickedCreated,
               ...filteredImpressionsCreated,
            ];
            const formattedDates = mergeCreated.map(date =>
               new Date(date).toISOString().slice(0, 10),
            );

            // Step 2: Remove duplicates using Set
            const uniqueDatesSet = new Set(formattedDates);

            // Step 3: Convert Set back to an array
            const uniqueDatesArray = Array.from(uniqueDatesSet);
            console.log(uniqueDatesArray);
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
