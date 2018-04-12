import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { UILoadingService } from './ui-loading.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[uiLoading]'
})
export class UILoadingDirective implements OnInit {
  @Input() uiLoading: string;
  constructor(private element: ElementRef, private uiLoadingService: UILoadingService) {}
  ngOnInit(): void {
    this.uiLoadingService.waitFor(this.element.nativeElement as HTMLElement, this.uiLoading);
  }
}
