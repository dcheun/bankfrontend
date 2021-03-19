import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css'],
})
export class ClientTableComponent implements OnInit {
  clients: Client[] = [];
  status: string = '';
  loading: boolean = true;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.clients = await this.clientService.getClients();
      if (this.clients.length === 0) {
        this.status = 'No clients found';
      } else {
        // sort by id
        this.clients.sort((a, b) => a.id - b.id);
        this.status = '';
      }
    } catch (err) {
      console.log(err);
      this.status = 'An error occurred';
    } finally {
      this.loading = false;
    }
  }

  async delete(id: number) {
    const result: boolean = await this.clientService.deleteClientById(id);
    this.clients = await this.clientService.getClients();
  }
}
