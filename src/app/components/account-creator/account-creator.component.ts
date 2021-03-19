import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { Client } from 'src/app/models/client';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-account-creator',
  templateUrl: './account-creator.component.html',
  styleUrls: ['./account-creator.component.css'],
})
export class AccountCreatorComponent implements OnInit {
  client: Client | null = null;
  account: Account | null = null;
  mode: string = '';
  id: number = 0;
  clientId: number = 0;
  clientName: string = '';
  accountNumber: string = '';
  balanceInCents: number = 0;
  status: string = '';
  loading: boolean = true;
  errMsg: string = '';

  constructor(
    private accountService: AccountService,
    private clientService: ClientService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.clientId = this.actRoute.snapshot.params.id;
    if (this.actRoute.snapshot.url[4]?.path === 'update') {
      this.mode = 'Update';
      this.id = this.actRoute.snapshot.params.aid;
    } else {
      this.mode = 'Create';
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    this.status = '';
    try {
      this.client = await this.clientService.getClientById(this.clientId);
      this.clientName = this.client.name;
      if (this.mode === 'Update') {
        this.account = await this.accountService.getAccountById(
          this.clientId,
          this.id
        );
        this.accountNumber = this.account.accountNumber;
        this.balanceInCents = this.account.balanceInCents;
      }
    } catch (err) {
      console.log(err);
      this.router.navigateByUrl('/not-found');
    } finally {
      this.loading = false;
    }
  }

  async submit() {
    this.status = '';
    this.errMsg = '';
    if (this.balanceInCents === null) {
      this.errMsg = 'Balance In Cents is required';
      return;
    }
    if (!this.accountNumber) {
      this.errMsg = 'Account Number is required';
      return;
    }
    try {
      if (this.account === null) {
        this.account = new Account(
          0,
          this.accountNumber,
          this.balanceInCents,
          this.clientId
        );
        this.account = await this.accountService.createAccount(this.account);
      } else {
        this.account.accountNumber = this.accountNumber;
        this.account.balanceInCents = this.balanceInCents;
        this.account = await this.accountService.updateAccount(this.account);
      }
      this.router.navigateByUrl(`/clients/${this.clientId}/accounts`);
    } catch (err) {
      console.log(err);
      this.errMsg = `ERROR: ${err.status} ${err.statusText} - ${err.error.title}`;
      if (this.mode === 'Create') {
        this.account = null;
      }
    }
  }
}
