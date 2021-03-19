import { Cents2dollarsPipe } from './cents2dollars.pipe';

describe('Cents2dollarsPipe', () => {
  it('create an instance', () => {
    const pipe = new Cents2dollarsPipe();
    expect(pipe).toBeTruthy();
  });
});
