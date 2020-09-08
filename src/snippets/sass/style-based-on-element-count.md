# Style Based on Element Count
> by Andrew Aponte

Conditionally applies styles based on the number of sibling elements that are present.

<br>

`SCSS`
```scss
@mixin if($args...) {
    @each $arg in $args {
        @if type-of($arg) == number {
           @for $i from 1 through $arg {
              &:nth-of-type(#{$i}):nth-last-of-type(#{$arg - $i + 1}) {
                 @content;
              }
           }
        }
     }
}

// change the text color to red if there are 3 elements present
li {
    @include if(3) {
        color: red;
    }
}
```

<br>

`HTML`
```html
<!-- the styling will be applied here, since there are 3 elements -->
<ul>
    <li>Apples</li>
    <li>Oranges</li>
    <li>Bananas</li>
</ul>

<!-- the styling will NOT be applied here, since there are only 2 elements -->
<ul>
    <li>Apples</li>
    <li>Oranges</li>
</ul>
```
