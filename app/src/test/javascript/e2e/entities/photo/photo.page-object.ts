import { element, by, ElementFinder } from 'protractor';

export class PhotoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-photo div table .btn-danger'));
  title = element.all(by.css('jhi-photo div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PhotoUpdatePage {
  pageTitle = element(by.id('jhi-photo-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  titleInput = element(by.id('field_title'));
  descriptionInput = element(by.id('field_description'));
  imageInput = element(by.id('file_image'));
  takenInput = element(by.id('field_taken'));

  albumSelect = element(by.id('field_album'));
  tagSelect = element(by.id('field_tag'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async setTakenInput(taken: string): Promise<void> {
    await this.takenInput.sendKeys(taken);
  }

  async getTakenInput(): Promise<string> {
    return await this.takenInput.getAttribute('value');
  }

  async albumSelectLastOption(): Promise<void> {
    await this.albumSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async albumSelectOption(option: string): Promise<void> {
    await this.albumSelect.sendKeys(option);
  }

  getAlbumSelect(): ElementFinder {
    return this.albumSelect;
  }

  async getAlbumSelectedOption(): Promise<string> {
    return await this.albumSelect.element(by.css('option:checked')).getText();
  }

  async tagSelectLastOption(): Promise<void> {
    await this.tagSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tagSelectOption(option: string): Promise<void> {
    await this.tagSelect.sendKeys(option);
  }

  getTagSelect(): ElementFinder {
    return this.tagSelect;
  }

  async getTagSelectedOption(): Promise<string> {
    return await this.tagSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PhotoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-photo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-photo'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
