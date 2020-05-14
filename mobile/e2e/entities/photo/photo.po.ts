import { element, by, browser, ElementFinder } from 'protractor';

export class PhotoComponentsPage {
    createButton = element(by.css('ion-fab-button'));
    viewButtons = element.all(by.css('ion-item'));
    title = element.all(by.css('ion-title')).get(2);
    noResult = element(by.cssContainingText('ion-label', 'No Photos found.'));
    entities = element.all(by.css('page-photo ion-item'));

    async clickOnCreateButton(): Promise<void> {
        await this.createButton.click();
    }

    async clickOnLastViewButton(): Promise<void> {
      await this.viewButtons.last().click();
    }

    async getTitle(): Promise<string> {
        return this.title.getText();
    }

    async getEntitiesNumber(): Promise <number> {
      return await this.entities.count();
    }
}


export class PhotoUpdatePage {
    pageTitle = element.all(by.css('ion-title')).get(3);
    saveButton = element.all(by.css('ion-button')).get(1);

    titleInput = element(by.css('ion-input[formControlName="title"] input'));
    descriptionInput = element(by.css('ion-textarea[formControlName="description"] textarea'));
    imageInput = element(by.css('ion-input[formControlName="image"] input'));


    async getPageTitle(): Promise<string> {
        return this.pageTitle.getText();
    }

    async setTitleInput(title: string): Promise<void> {
        await this.titleInput.sendKeys(title);
    }
    async setDescriptionInput(description: string): Promise<void> {
        await this.descriptionInput.sendKeys(description);
    }
    async setImageInput(image: string): Promise<void> {
        await this.imageInput.sendKeys(image);
    }

    async save(): Promise<void> {
        await this.saveButton.click();
    }
}

export class PhotoDetailPage {
    pageTitle = element.all(by.css('ion-title')).get(3);
    deleteButton = element(by.css('ion-button[color="danger"]'));
    titleInput = element.all(by.css('span')).get(1);

    descriptionInput = element.all(by.css('span')).get(2);

    imageInput = element.all(by.css('span')).get(3);




    async getTitleInput(): Promise<string> {
        return await this.titleInput.getText();
    }

    async getDescriptionInput(): Promise<string> {
        return await this.descriptionInput.getText();
    }

    async getImageInput(): Promise<string> {
        return await this.imageInput.getText();
    }


    async clickOnDeleteButton(): Promise<void> {
      await this.deleteButton.click();
    }

    async getPageTitle(): Promise<string> {
      return this.pageTitle.getText();
    }
}
