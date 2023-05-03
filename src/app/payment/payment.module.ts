import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from '../button/button.module';
import {PaymentComponent} from './payment.component';
import {PaymentService} from './shared/payment.service';
import {ReportService} from './shared/report.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ButtonModule
  ],
  declarations: [PaymentComponent],
  providers: [
    PaymentService,
    ReportService
  ],
  exports: [PaymentComponent]
})
export class PaymentModule {
}
