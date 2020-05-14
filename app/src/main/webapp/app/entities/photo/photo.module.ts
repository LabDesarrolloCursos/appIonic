import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSharedModule } from 'app/shared/shared.module';
import { PhotoComponent } from './photo.component';
import { PhotoDetailComponent } from './photo-detail.component';
import { PhotoUpdateComponent } from './photo-update.component';
import { PhotoDeleteDialogComponent } from './photo-delete-dialog.component';
import { photoRoute } from './photo.route';

@NgModule({
  imports: [AppSharedModule, RouterModule.forChild(photoRoute)],
  declarations: [PhotoComponent, PhotoDetailComponent, PhotoUpdateComponent, PhotoDeleteDialogComponent],
  entryComponents: [PhotoDeleteDialogComponent]
})
export class AppPhotoModule {}
