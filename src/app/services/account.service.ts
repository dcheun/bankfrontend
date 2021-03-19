import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BASE_URL: string = 'http://localhost:7000';
  accounts: Account[] = [];

  constructor(private http: HttpClient) {}

  // Create
  async createAccount(account: Account): Promise<Account> {
    account = await this.http
      .post<Account>(
        `${this.BASE_URL}/clients/${account.clientId}/accounts`,
        account
      )
      .toPromise();
    return account;
  }

  // Read
  async getAccountById(clientId: number, id: number): Promise<Account> {
    const account = await this.http
      .get<Account>(`${this.BASE_URL}/clients/${clientId}/accounts/${id}`)
      .toPromise();
    return account;
  }

  async getAllAccounts(clientId: number): Promise<Account[]> {
    this.accounts = await this.http
      .get<Account[]>(`${this.BASE_URL}/clients/${clientId}/accounts`)
      .toPromise();
    return this.accounts;
  }

  // Update
  async updateAccount(account: Account): Promise<Account> {
    account = await this.http
      .put<Account>(
        `${this.BASE_URL}/clients/${account.clientId}/accounts/${account.id}`,
        account
      )
      .toPromise();
    return account;
  }

  // Delete
  async deleteAccountById(clientId: number, id: number): Promise<boolean> {
    const res: string = await this.http
      .request(
        'DELETE',
        `${this.BASE_URL}/clients/${clientId}/accounts/$id{}`,
        {
          responseType: 'text',
        }
      )
      .toPromise();
    console.log(res);
    return true;
  }
}
