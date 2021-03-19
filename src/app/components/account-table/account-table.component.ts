import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-table',
  templateUrl: './account-table.component.html',
  styleUrls: ['./account-table.component.css'],
})
export class AccountTableComponent implements OnInit {
  accounts: Account[] = [];
  clientId: number = 0;
  status: string = '';
  loading: boolean = true;
  displayedColumns: string[] = [
    'id',
    'accountNumber',
    'balanceInCents',
    'actions',
  ];

  constructor(
    private accountService: AccountService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    this.clientId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.accounts = await this.accountService.getAllAccounts(this.clientId);
      if (this.accounts.length === 0) {
        this.status = 'Client has no accounts';
      } else {
        // Sort by id
        this.accounts.sort((a, b) => a.id - b.id);
        this.status = '';
      }
    } catch (err) {
      console.log(err);
      this.status = 'An error occurred';
      this.router.navigateByUrl('/not-found');
    } finally {
      this.loading = false;
    }
  }

  async delete(id: number) {
    await this.accountService.deleteAccountById(this.clientId, id);
  }
}
