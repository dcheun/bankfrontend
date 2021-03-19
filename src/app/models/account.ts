export class Account {
  constructor(
    public id: number,
    public accountNumber: string,
    public balanceInCents: number,
    public clientId: number
  ) {}
}
