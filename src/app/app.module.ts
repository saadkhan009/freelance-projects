import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

// tslint:disable-next-line:max-line-length
import { MatButtonModule, MatCheckboxModule, MatSidenavModule, MatListModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

import { AmazingTimePickerModule } from 'amazing-time-picker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgComponent } from './ng/ng.component';
import { RegisterComponent } from './register/register.component';
import { TemplatesComponent } from './templates/templates.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterService } from './register.service';
import { ScratchTemplateComponent } from './scratch-template/scratch-template.component';
import { ScratchSectionComponent } from './scratch-section/scratch-section.component';
import { IconsComponent } from './icons/icons.component';
import { TemplatesService } from './templates.service';
import { ScratchItemComponent } from './scratch-item/scratch-item.component';
import { EditTemplateComponent } from './edit-template/edit-template.component';
import { EditSectionComponent } from './edit-section/edit-section.component';
import { ScratchCommentComponent } from './scratch-comment/scratch-comment.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewTemplateComponent } from './view-template/view-template.component';
import { NewInspectionComponent } from './new-inspection/new-inspection.component';
import { ItemsService } from './items.service';
import { CommentsService } from './comments.service';
import { SectionsService } from './sections.service';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { InspectionsComponent } from './inspections/inspections.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { MetricsComponent } from './metrics/metrics.component';
import { ClientsService } from './clients.service';
import { InspectionsService } from './inspections.service';
import { MetricsService } from './metrics.service';

const appRoutes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'templates', component: TemplatesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inspections', component: InspectionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'new-inspection', component: NewInspectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts', component: ContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'metrics', component: MetricsComponent,
    canActivate: [AuthGuard]
  }
];

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NgComponent,
    InspectionsComponent,
    RegisterComponent,
    TemplatesComponent,
    HomeComponent,
    ScratchTemplateComponent,
    ScratchSectionComponent,
    IconsComponent,
    ScratchItemComponent,
    EditTemplateComponent,
    EditSectionComponent,
    ScratchCommentComponent,
    EditItemComponent,
    ViewTemplateComponent,
    NewInspectionComponent,
    ContactsComponent,
    ClientsInfoComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    LayoutModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:9999']
      }
    }),
    AmazingTimePickerModule
  ],
  exports: [
    MatMenuModule,
  ],
  // tslint:disable-next-line:max-line-length
  providers: [AuthGuard,
    AuthService,
    RegisterService,
    CookieService,
    TemplatesService,
    ItemsService,
    CommentsService,
    SectionsService,
    AmazingTimePickerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ScratchTemplateComponent,
    ScratchSectionComponent,
    IconsComponent,
    ScratchItemComponent,
    EditTemplateComponent,
    EditSectionComponent,
    ScratchCommentComponent,
    EditItemComponent,
    ViewTemplateComponent
  ]
})
export class AppModule { }
