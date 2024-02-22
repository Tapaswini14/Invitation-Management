import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TopnavComponent } from './Dashboard/topnav/topnav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './Dashboard/home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import '@angular/localize/init';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { BirthdayInvitationComponent } from './Cards/birthday-invitation/birthday-invitation.component';
import { BusinessOpeningComponent } from './Cards/business-opening/business-opening.component';
import { HouseWarmingComponent } from './Cards/house-warming/house-warming.component';
import { ThreadCeremonyComponent } from './Cards/thread-ceremony/thread-ceremony.component';
import { WeddingInvitationComponent } from './Cards/wedding-invitation/wedding-invitation.component';
import { SubmitPageComponent } from './Cards/submit-page/submit-page.component';
import { HinduBrideWeddingComponent } from './Cards/hindu-bride-wedding/hindu-bride-wedding.component';
import { HinduGroomWeddingComponent } from './Cards/hindu-groom-wedding/hindu-groom-wedding.component';
import { MuslimGroomWeddingComponent } from './Cards/muslim-groom-wedding/muslim-groom-wedding.component';
import { MuslimBrideWeddingComponent } from './Cards/muslim-bride-wedding/muslim-bride-wedding.component';
import { MuslimWeddingInvitationComponent } from './Cards/muslim-wedding-invitation/muslim-wedding-invitation.component';
import { ChristianWeddingInvitationComponent } from './Cards/christian-wedding-invitation/christian-wedding-invitation.component';
import { ChristianBrideInvitationComponent } from './Cards/christian-bride-invitation/christian-bride-invitation.component';
import { ChristianGroomInvitationComponent } from './Cards/christian-groom-invitation/christian-groom-invitation.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    HomeComponent,
    BirthdayInvitationComponent,
    BusinessOpeningComponent,
    HouseWarmingComponent,
    ThreadCeremonyComponent,
    WeddingInvitationComponent,
    SubmitPageComponent,
    HinduBrideWeddingComponent,
    HinduGroomWeddingComponent,
    MuslimGroomWeddingComponent,
    MuslimBrideWeddingComponent,
    MuslimWeddingInvitationComponent,
    ChristianWeddingInvitationComponent,
    ChristianBrideInvitationComponent,
    ChristianGroomInvitationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    CanvasJSAngularChartsModule,
    MatStepperModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatExpansionModule,
    NgbModule,
    NgbDropdownModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatDialogModule,
    NzIconModule,
    NzToolTipModule,
    NzMenuModule,
    NzLayoutModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
