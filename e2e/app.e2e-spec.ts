import { WebCezarPage } from './app.po';

describe('webcezar App', () => {
  let page: WebCezarPage;

  beforeEach(() => {
    page = new WebCezarPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
