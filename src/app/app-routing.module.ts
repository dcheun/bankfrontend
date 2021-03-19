import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreatorComponent } from './components/account-creator/account-creator.component';
import { AccountTableComponent } from './components/account-table/account-table.component';
import { ClientCreatorComponent } from './components/client-creator/client-creator.component';
import { ClientTableComponent } from './components/client-table/client-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'clients', component: ClientTableComponent },
  { path: 'clients/create', component: ClientCreatorComponent },
  { path: 'clients/:id/update', component: ClientCreatorComponent },
  { path: 'clients/:id/accounts', component: AccountTableComponent },
  { path: 'clients/:id/accounts/create', component: AccountCreatorComponent },
  {
    path: 'clients/:id/accounts/:aid/update',
    component: AccountCreatorComponent,
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: ClientTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
