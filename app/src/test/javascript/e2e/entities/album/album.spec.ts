import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlbumComponentsPage, AlbumDeleteDialog, AlbumUpdatePage } from './album.page-object';

const expect = chai.expect;

describe('Album e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let albumComponentsPage: AlbumComponentsPage;
  let albumUpdatePage: AlbumUpdatePage;
  let albumDeleteDialog: AlbumDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Albums', async () => {
    await navBarPage.goToEntity('album');
    albumComponentsPage = new AlbumComponentsPage();
    await browser.wait(ec.visibilityOf(albumComponentsPage.title), 5000);
    expect(await albumComponentsPage.getTitle()).to.eq('appApp.album.home.title');
    await browser.wait(ec.or(ec.visibilityOf(albumComponentsPage.entities), ec.visibilityOf(albumComponentsPage.noResult)), 1000);
  });

  it('should load create Album page', async () => {
    await albumComponentsPage.clickOnCreateButton();
    albumUpdatePage = new AlbumUpdatePage();
    expect(await albumUpdatePage.getPageTitle()).to.eq('appApp.album.home.createOrEditLabel');
    await albumUpdatePage.cancel();
  });

  it('should create and save Albums', async () => {
    const nbButtonsBeforeCreate = await albumComponentsPage.countDeleteButtons();

    await albumComponentsPage.clickOnCreateButton();

    await promise.all([
      albumUpdatePage.setTitleInput('title'),
      albumUpdatePage.setDescriptionInput('description'),
      albumUpdatePage.setCreatedInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      albumUpdatePage.userSelectLastOption()
    ]);

    expect(await albumUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await albumUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await albumUpdatePage.getCreatedInput()).to.contain('2001-01-01T02:30', 'Expected created value to be equals to 2000-12-31');

    await albumUpdatePage.save();
    expect(await albumUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Album', async () => {
    const nbButtonsBeforeDelete = await albumComponentsPage.countDeleteButtons();
    await albumComponentsPage.clickOnLastDeleteButton();

    albumDeleteDialog = new AlbumDeleteDialog();
    expect(await albumDeleteDialog.getDialogTitle()).to.eq('appApp.album.delete.question');
    await albumDeleteDialog.clickOnConfirmButton();

    expect(await albumComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
