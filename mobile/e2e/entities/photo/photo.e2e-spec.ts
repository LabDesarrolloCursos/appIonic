import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import {
  PhotoComponentsPage,
      PhotoDetailPage,
      PhotoUpdatePage
} from './photo.po';

describe('Photo e2e test', () => {

  let loginPage: LoginPage;
  let photoComponentsPage: PhotoComponentsPage;
  let photoUpdatePage: PhotoUpdatePage;
  let photoDetailPage: PhotoDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Photos';
  const SUBCOMPONENT_TITLE = 'Photo';
  let lastElement: any;
  let isVisible = false;

  const title = 'title';
  const description = 'description';
  
  beforeAll(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateTo('/');
    await loginPage.signInButton.click();
    const username = process.env.E2E_USERNAME || 'admin';
    const password = process.env.E2E_PASSWORD || 'admin';
    await browser.wait(ec.elementToBeClickable(loginPage.loginButton), 3000);
    await loginPage.login(username, password);
    await browser.wait(ec.visibilityOf(loginPage.logoutButton), 1000);

  });

  it('should load Photos', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element.all(by.css('ion-item'))
      .filter(async el => (await el.element(by.css('h2')).getText()) === 'Photo').first().click();

    photoComponentsPage = new PhotoComponentsPage();
    await browser.wait(ec.visibilityOf(photoComponentsPage.title), 5000);
    expect(await photoComponentsPage.getTitle())
      .toEqual(COMPONENT_TITLE);
    await browser.wait(ec.or(ec.visibilityOf(photoComponentsPage.entities.get(0)), ec.visibilityOf(photoComponentsPage.noResult)), 5000);
  });

  it('should create Photo', async () => {
    initNumberOfEntities = await photoComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(photoComponentsPage.createButton), 5000);
    await photoComponentsPage.clickOnCreateButton();
    photoUpdatePage = new PhotoUpdatePage();
    await browser.wait(ec.visibilityOf(photoUpdatePage.pageTitle), 1000);
    expect(await photoUpdatePage.getPageTitle())
      .toEqual(SUBCOMPONENT_TITLE);

    await photoUpdatePage.setTitleInput(title);
    await photoUpdatePage.setDescriptionInput(description);
    await photoUpdatePage.setImageInput(image);

    await photoUpdatePage.save();
    await browser.wait(ec.visibilityOf(photoComponentsPage.title), 1000);
    expect(await photoComponentsPage.getTitle())
      .toEqual(COMPONENT_TITLE);
    expect(await photoComponentsPage.getEntitiesNumber())
      .toEqual(initNumberOfEntities + 1);
  });

  it('should get the last Photo', async () => {
    photoComponentsPage = new PhotoComponentsPage();
    await browser.wait(ec.visibilityOf(photoComponentsPage.title), 5000);
    lastElement = await photoComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last Photo', async () => {
    browser.executeScript('arguments[0].scrollIntoView()', lastElement)
      .then(async () => {
        if (await lastElement.isEnabled() && await lastElement.isDisplayed()) {
          browser.executeScript('arguments[0].click()', lastElement)
            .then(async () => {
              isVisible = true;
            })
            .catch();
        }
      })
      .catch();
  });

  it('should view the last Photo', async () => {
    photoDetailPage = new PhotoDetailPage();
    if (isVisible && await photoDetailPage.pageTitle.isDisplayed()) {
    expect(await photoDetailPage.getPageTitle())
      .toEqual(SUBCOMPONENT_TITLE);


    expect(await photoDetailPage.getTitleInput()).toEqual(title);

    expect(await photoDetailPage.getDescriptionInput()).toEqual(description);

    expect(await photoDetailPage.getImageInput()).toEqual(image);

    }
  });

  it('should delete last Photo', async () => {
    photoDetailPage = new PhotoDetailPage();
    if (isVisible && await photoDetailPage.deleteButton.isDisplayed()) {
    await browser.executeScript('arguments[0].click()', await photoDetailPage.deleteButton.getWebElement());

    const alertConfirmButton = element.all(by.className('alert-button')).last();

    await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
    alertConfirmButton.click();
    await browser.wait(ec.visibilityOf(photoComponentsPage.title), 3000);
    expect(await photoComponentsPage.getTitle())
      .toEqual(COMPONENT_TITLE);
    expect(await photoComponentsPage.getEntitiesNumber())
      .toEqual(initNumberOfEntities);
    }
  });


  it('finish Photos tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
