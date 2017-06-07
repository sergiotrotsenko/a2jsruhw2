import { A2jsruhw2Page } from './app.po';

describe('a2jsruhw2 App', () => {
  let page: A2jsruhw2Page;

  beforeEach(() => {
    page = new A2jsruhw2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
