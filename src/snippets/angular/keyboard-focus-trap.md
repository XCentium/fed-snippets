# Keyboard Focus Trap
> by Andrew Aponte

The Angular implementation of a [Keyboard Focus Trap](/snippets/accessibility/keyboard-focus-trap.html).

First, add the focus trap directive code:

`src/app/directives/focus-trap.directive.ts`
``` ts
import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';

@Directive({
    selector: '[focusTrap]',
})
export class FocusTrapDirective implements AfterViewInit, OnChanges, OnDestroy {
    @Input('focusTrap') isActive: boolean = true;

    isReady = false;
    parentElem: HTMLElement;
    firstFocusableElem: HTMLElement;
    lastFocusableElem: HTMLElement;
    focusableElements: HTMLElement[];
    mutationObserver: MutationObserver;

    TAB_KEY_CODE = 9;
    FOCUSABLE_ELEMENT_SELECTORS = [
        '[contenteditable]:not([aria-hidden])',
        '[tabindex="0"]:not([aria-hidden])',
        'a[href]:not([aria-hidden])',
        'area[href]:not([aria-hidden])',
        'button:not([disabled]):not([aria-hidden])',
        'iframe:not([aria-hidden])',
        'input:not([disabled]):not([aria-hidden])',
        'object:not([aria-hidden])',
        'select:not([disabled]):not([aria-hidden])',
        'textarea:not([disabled]):not([aria-hidden])',
    ];

    constructor(private elementRef: ElementRef) {
        this.parentElem = this.elementRef.nativeElement;
    }

    ngOnChanges(): void {
        if (this.isActive && this.isReady) {
            this.init();
        } else {
            this.cleanup();
        }
    }

    ngAfterViewInit(): void {
        this.isReady = true;
        this.init();
    }

    ngOnDestroy(): void {
        this.cleanup();
    }

    init = (): void => {
        this.cacheFocusableElements();

        if (!this.focusableElements.length) return;

        this.firstFocusableElem.focus();
        this.parentElem.addEventListener('keydown', this.keyboardHandler);

        this.mutationObserver = new MutationObserver(this.onMutation);
        this.mutationObserver.observe(this.parentElem, { attributes: true, subtree: true });
    }

    cacheFocusableElements = (): void => {
        const allFocusableElements = this.parentElem.querySelectorAll(this.FOCUSABLE_ELEMENT_SELECTORS.join(', '));
        const hiddenElements = this.parentElem.querySelectorAll(this.FOCUSABLE_ELEMENT_SELECTORS.map((s) => `[aria-hidden] ${ s }`).join(', '));

        this.focusableElements = Array.from(allFocusableElements).filter((elem) => {
            return !Array.from(hiddenElements).includes(elem);
        }) as HTMLElement[];

        if (!this.focusableElements.length) return;

        this.firstFocusableElem = this.focusableElements[0];
        this.lastFocusableElem = this.focusableElements[this.focusableElements.length - 1];
    }

    keyboardHandler = (e: KeyboardEvent): void => {
        if (e.keyCode !== this.TAB_KEY_CODE) return;

        e.stopPropagation();

        if (e.shiftKey && document.activeElement === this.firstFocusableElem) {
            e.preventDefault();
            this.lastFocusableElem.focus();
        }

        if (!e.shiftKey && document.activeElement === this.lastFocusableElem) {
            e.preventDefault();
            this.firstFocusableElem.focus();
        }
    }

    onMutation = (): void => {
        this.cacheFocusableElements();
    }

    cleanup = (): void => {
        this.parentElem.removeEventListener('keydown', this.keyboardHandler);

        if (this.mutationObserver) this.mutationObserver.disconnect();
    }
}

```

<br>

Next, register the directive inside your root app module:

`src/app/app.module.ts`
``` ts
import { NgModule } from '@angular/core';
import { FocusTrapDirective } from '@/app/directives/focus-trap.directive';

@NgModule({
    declarations: [FocusTrapDirective],
    exports: [FocusTrapDirective],
})
export class AppModule {}
```

<br>

Finally, use the directive as you see fit:

`src/app/components/modal/modal.component.html`
```html
<div [focusTrap]="isVisible">
    <!-- modal component HTML -->
</div>
```

`src/app/components/modal/modal.component.ts`
```ts
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    isVisible = true;
}
```
