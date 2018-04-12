import { NgModule } from '@angular/core';
import { UILoadingDirective } from './ui-loading.directive';
import { UILoadingService } from './ui-loading.service';

@NgModule({
  providers: [
    UILoadingService
  ],
  exports: [UILoadingDirective],
  declarations: [UILoadingDirective]
})
export class UILoadingModule { }
