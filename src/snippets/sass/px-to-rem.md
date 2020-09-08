# PX to REM Converter
> by Andrew Aponte

This allows you to easily convert from `px` units to `rem` without having to use a calculator.

<br>

`SCSS`
```scss
@function rem($px) {
    @return #{ $px / $font-size-root }rem;
}

.my-component {
    font-size: rem(36); // 2.25rem (assuming the document root is 16px)
}
```
