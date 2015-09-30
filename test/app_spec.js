import { expect } from 'chai';
import { greet } from '../app';

describe('greets', () => {
  it('works', () => {
    let greeting = greet('Tonton');
    expect(greeting).to.equal('Hello, Tonton');
  });
});
