import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class UILoadingService {

    loadingRegistrations: LoadingRegistration[] = [];
    idIndex: number = 0;

    private styleClass: string = '';

    constructor() {
        this.styleClass = '';
        const style: HTMLStyleElement = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = this.defaultStyle;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    static configure(options: UILoadingServiceOptions = null): UILoadingService {
        const uiLoadingService: UILoadingService = new UILoadingService();
        uiLoadingService.styleClass = options.styleClass;
        return uiLoadingService;
    }

    addOverlay(hostElement: HTMLElement, id: string): void {
        const overlay: any = document.createElement("div") as HTMLDivElement;
        hostElement.style.position = 'relative';
        hostElement.appendChild(overlay);
        overlay.outerHTML = this.getOverlayHtml(id, this.styleClass);
    }

    getOverlayHtml = (id: string, styleClass: string) =>
        `<div class="ui-loading-overlay-${id} ui-loading ${styleClass}">` +
            `<div class="dots">` +
                `<span>▪</span><span>▪</span><span>▪</span>
            </div>` +
        `</div>`

    get defaultStyle(): string {
        return `
            @keyframes blink {
                0% {
                opacity: .2;
                }
                20% {
                opacity: 1;
                }
                100% {
                opacity: .2;
                }
            }
            .ui-loading {
                top: 0;
                padding-top: 25%;
                padding-left: 48%;
                font-size: 1rem;
                letter-spacing: 0.5rem;
                white-space: pre;
                position: absolute;
                width: 100%;
                height: 100%;
                display: block;
                z-index: 9999999;
                background: rgba(255, 255, 255, 0.9);
            }
            .dots span {
                animation-name: blink;
                animation-duration: 1.4s;
                animation-iteration-count: infinite;
                animation-fill-mode: both;
            }

            .dots span:nth-child(2) {
                animation-delay: .2s;
            }

            .dots span:nth-child(3) {
                animation-delay: .4s;
            }
            `;
    }

    waitFor(element: HTMLElement, action: string): void {
        this.loadingRegistrations.push({
            element: element,
            action: action,
            registration: null,
            id: this.idIndex++
        });
    }

    subscribeAndWait(action: string, observable: Observable<any>): Subscription {
        return this.wait(action, observable.subscribe());
    }

    wait(action: string, subscription: Subscription): Subscription {
        this.updateUILoadingStyle(action, false);
        return subscription.add(() => {
            this.updateUILoadingStyle(action, true);
        });
    }

    updateUILoadingStyle(action: string, done: boolean): void {
        this.loadingRegistrations
        .filter(s => s.action === action)
        .forEach(s => {
            if (done) {
                const overlay: Element = s.element.getElementsByClassName(`ui-loading-overlay-${s.id}`)[0];
                if (overlay) {
                    overlay.remove();
                }
            } else {
                this.addOverlay(s.element, s.id.toString());
            }
        });
    }
}

export interface LoadingRegistration {
    id: number;
    action: string;
    element: HTMLElement;
    registration: Subscription;
}

export interface UILoadingServiceOptions {
    styleClass: string;
}
