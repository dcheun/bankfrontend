import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-creator',
  templateUrl: './client-creator.component.html',
  styleUrls: ['./client-creator.component.css'],
})
export class ClientCreatorComponent implements OnInit {
  client: Client | null = null;
  mode: string = '';
  name: string = '';
  id: number = 0;
  status: string = '';
  loading: boolean = true;
  errMsg: string = '';

  constructor(
    private clientService: ClientService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    if (this.actRoute.snapshot.url[2]?.path === 'update') {
      this.mode = 'Update';
      this.id = this.actRoute.snapshot.params.id;
    } else {
      this.mode = 'Create';
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    if (this.mode === 'Create') {
      this.loading = false;
      return;
    }
    this.loading = true;
    try {
      this.client = await this.clientService.getClientById(this.id);
      this.name = this.client.name;
    } catch (err) {
      console.log(err);
      this.router.navigateByUrl('/not-found');
    } finally {
      this.loading = false;
    }
  }

  async submit() {
    this.errMsg = '';
    if (this.name === '') {
      this.errMsg = 'Name is required';
      return;
    }
    if (this.client === null) {
      this.client = new Client(0, this.name);
      this.client = await this.clientService.createClient(this.client);
    } else {
      this.client.name = this.name;
      this.client = await this.clientService.updateClient(this.client);
    }
    this.router.navigateByUrl('/');
  }
}
