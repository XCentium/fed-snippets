# Loading Animation
> by Andrew Aponte

A directive that will display a loading animation when passed `true`. It comes with two loading animations by default - floating dots, and a spinner.

First, add the loading directive code:

`src/app/directives/loading.directive.ts`
``` ts
import { Directive, ElementRef, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { v4 as uuid } from 'uuid';

enum Types {
    DOTS = 'dots',
    SPINNER = 'spinner',
}

interface LoadingOptions {
    /** This controls the loading icon color. */
    color: string;

    /** The [x,y] position that the loading icon is placed in. Defaults to ['50%', '50%']. */
    position?: [string, string];

    /** This determines the loading icon size, in pixels. */
    size: number;

    /** Type type of loading icon to display. The available options are "dots" and "spinner". */
    type?: Types;
}

@Directive({
    selector: '[loading]',
})
export class LoadingDirective implements OnInit, OnChanges, OnDestroy {
    @Input() loading = false;
    @Input() loadingOptions: LoadingOptions;

    isReady = false;
    elem: HTMLElement;
    iconElem: HTMLElement;
    options: LoadingOptions = {
        color: '#000',
        position: ['50%', '50%'],
        size: 13,
        type: Types.DOTS,
    };
    styleElem: HTMLElement;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        // skip if being called during SSR
        if (typeof document === 'undefined') return;

        this.elem = this.elementRef.nativeElement;
        this.options = {
            ...this.options,
            ...this.loadingOptions,
        };

        this.createElements();
        this.onChange();
    }

    ngOnChanges(): void {
        // skip if being called during SSR
        if (typeof document === 'undefined') return;

        this.onChange();
    }

    ngOnDestroy(): void {
        // skip if being called during SSR
        if (typeof document === 'undefined') return;

        this.stop();
    }

    createElements(): void {
        // adding "gb-" in the front as IDs cannot start with a number
        // ... if you want them to be used as CSS selectors
        const id = `gb-${ uuid() }`;

        switch (this.options.type) {
            case Types.DOTS:
                this.iconElem = document.createElement('div');
                this.iconElem.id = id;
                this.iconElem.appendChild(document.createElement('div'));

                this.styleElem = document.createElement('style');
                this.styleElem.textContent = this.generateStyles(id, this.options.type);
                break;

            case Types.SPINNER:
                this.iconElem = document.createElement('div');
                this.iconElem.id = id;
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));
                this.iconElem.appendChild(document.createElement('div'));

                this.styleElem = document.createElement('style');
                this.styleElem.textContent = this.generateStyles(id, this.options.type);
                break;

            default:
                console.warn(`[LOADING DIRECTIVE] Unable to generate the elements. The specified type "${ this.options.type }" is not recognized.`);
        }

        this.isReady = true;
    }

    onChange(): void {
        if (!this.isReady) return;

        if (this.loading) {
            this.start();
        } else {
            this.stop();
        }
    }

    start(): void {
        const currentPosition = window.getComputedStyle(this.elem).position;

        this.elem.classList.add('invisible-children');
        if (currentPosition === 'static') this.elem.style.setProperty('position', 'relative', 'important');
        this.elem.style.setProperty('color', 'transparent', 'important');
        this.elem.appendChild(this.iconElem);
        this.elem.appendChild(this.styleElem);
    }

    stop(): void {
        this.elem.classList.remove('invisible-children');
        this.elem.style.removeProperty('color');
        this.elem.style.removeProperty('color');
        if (this.elem.contains(this.iconElem)) this.elem.removeChild(this.iconElem);
        if (this.elem.contains(this.styleElem)) this.elem.removeChild(this.styleElem);
    }

    generateStyles(elemId: string, type: string): string {
        switch (type) {
            case Types.DOTS:
                return `
                    #${ elemId } {
                        position: absolute;
                        left: ${ this.options.position[0] };
                        top: ${ this.options.position[1] };
                        transform: translateX(-50%) translateY(-50%);
                        visibility: visible !important;
                        vertical-align: middle;
                        font-size: ${ this.options.size }px;
                        margin-top: 0.6em;
                    }
        
                    #${ elemId } > div, #${ elemId }:before, #${ elemId }:after {
                        display: inline-block;
                        width: ${ this.options.size }px;
                        height: ${ this.options.size }px;
                        background: ${ this.options.color };
                        margin-bottom: -0.41em;
                        border-radius: 50%;
                        animation: loading-animation-dots 0.6s infinite alternate;
                    }
                    
                    #${ elemId } > div, #${ elemId }:before, #${ elemId }:after {
                        content: "";
                    }
                    
                    #${ elemId } > div {
                        margin: 0 0.41em;
                    }
                    
                    #${ elemId } > div {
                        animation-delay: 0.2s;
                    }
                    
                    #${ elemId }:after {
                        animation-delay: 0.4s;
                    }
                    
                    @keyframes loading-animation-dots {
                        to {
                            opacity: 0.1;
                            transform: translate3d(0, -1.23em, 0);
                        }
                    } 
                `;

            // TODO - update this to work with options.size
            case Types.SPINNER:
                return `
                    #${ elemId } {
                        position: absolute;
                        left: ${ this.options.position[0] };
                        top: ${ this.options.position[1] };
                        transform: translateX(-50%) translateY(-50%) scale(${ this.options.size / 16 });
                        font-size: 1rem;
                        width: 5em;
                        height: 5em;
                        visibility: visible !important;
                    }

                    #${ elemId } div {
                        animation: loading-animation-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                        transform-origin: 2.5em 2.5em;
                    }
                
                    #${ elemId } div:after {
                        content: " ";
                        display: block;
                        position: absolute;
                        width: 0.5em;
                        height: 0.5em;
                        border-radius: 50%;
                        background-color: ${ this.options.color };
                        opacity: 0.5;
                        margin: -0.25em 0 0 -0.25em;
                    }
                
                    #${ elemId } div:nth-child(1) { animation-delay: -0.036s; }
                    #${ elemId } div:nth-child(1):after { top: 63px; left: 63px; }
                    #${ elemId } div:nth-child(2) { animation-delay: -0.072s; }
                    #${ elemId } div:nth-child(2):after { top: 68px; left: 56px; }
                    #${ elemId } div:nth-child(3) { animation-delay: -0.108s; }
                    #${ elemId } div:nth-child(3):after { top: 71px; left: 48px; }
                    #${ elemId } div:nth-child(4) { animation-delay: -0.144s; }
                    #${ elemId } div:nth-child(4):after { top: 72px; left: 40px; }
                    #${ elemId } div:nth-child(5) { animation-delay: -0.18s; }
                    #${ elemId } div:nth-child(5):after { top: 71px; left: 32px; }
                    #${ elemId } div:nth-child(6) { animation-delay: -0.216s; }
                    #${ elemId } div:nth-child(6):after { top: 68px; left: 24px; }
                    #${ elemId } div:nth-child(7) { animation-delay: -0.252s; }
                    #${ elemId } div:nth-child(7):after { top: 63px; left: 17px; }
                    #${ elemId } div:nth-child(8) { animation-delay: -0.288s; }
                    #${ elemId } div:nth-child(8):after { top: 56px; left: 12px; }
                    
                    @keyframes loading-animation-spinner {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }                
                `;

            default:
                // noop
                return '';
        }
    }
}
```

<br>

Next, register the directive inside your root app module:

`src/app/app.module.ts`
``` ts
import { NgModule } from '@angular/core';
import { LoadingDirective } from '@/app/directives/loading.directive';

@NgModule({
    declarations: [LoadingDirective],
    exports: [LoadingDirective],
})
export class AppModule {}
```

<br>

Finally, use the directive as you see fit:

`src/app/components/foo/foo.component.html`
```html
<button
    type="button"
    [loading]="isLoading"
    [loadingOptions]="{ type: 'dots', color: '#222', size: 10 }"
    (click)="onClick()"
>
    Click me to see the Dots animation
</button>

<br><br>

<button
    type="button"
    [loading]="isLoading"
    [loadingOptions]="{ type: 'spinner', color: '#222', size: 10 }"
    (click)="onClick()"
>
    Click me to see the Spinner animation
</button>
```

`src/app/components/foo/foo.component.ts`
```ts
@Component({
    selector: 'app-foo',
    templateUrl: './foo.component.html',
    styleUrls: ['./foo.component.css'],
})
export class FooComponent {
    isLoading = false;

    onClick(): void {
        this.isLoading = true;
    }
}
```
