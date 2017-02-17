import { EpsSharedWebPage } from './app.po';

describe('eps-shared-web App', () => {
  let page: EpsSharedWebPage;

  beforeEach(() => {
    page = new EpsSharedWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
