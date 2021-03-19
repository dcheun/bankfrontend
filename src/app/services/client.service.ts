import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  BASE_URL: string = 'http://localhost:7000';
  clients: Client[] = [];

  constructor(private http: HttpClient) {}

  // Load initial data.
  async loadInitialData(): Promise<void> {
    await this.loadClients();
  }

  async loadClients(): Promise<void> {
    this.clients = await this.http
      .get<Client[]>(`${this.BASE_URL}/clients`)
      .toPromise();
  }

  // Create
  async createClient(client: Client): Promise<Client> {
    client = await this.http
      .post<Client>(`${this.BASE_URL}/clients`, client)
      .toPromise();
    return client;
  }

  // Read
  async getClientById(id: number): Promise<Client> {
    const client = await this.http
      .get<Client>(`${this.BASE_URL}/clients/${id}`)
      .toPromise();
    return client;
  }

  async getClients(): Promise<Client[]> {
    // if (this.clients.length !== 0) {
    //   return this.clients;
    // }
    await this.loadClients();
    return this.clients;
  }

  // Update
  async updateClient(client: Client): Promise<Client> {
    client = await this.http
      .put<Client>(`${this.BASE_URL}/clients/${client.id}`, client)
      .toPromise();
    return client;
  }

  // Delete
  async deleteClientById(id: number): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/clients/${id}`, {
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
