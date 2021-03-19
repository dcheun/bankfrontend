import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientCreatorComponent } from './components/client-creator/client-creator.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccountCreatorComponent } from './components/account-creator/account-creator.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { Cents2dollarsPipe } from './pipes/cents2dollars.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ClientCreatorComponent,
    ClientTableComponent,
    NotFoundComponent,
    AccountCreatorComponent,
    AccountTableComponent,
    Cents2dollarsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
