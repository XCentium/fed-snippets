# Aspect Ratio
> by Andrew Aponte

Resizes and crops an image according to the specified aspect ratio.

<br>

`SCSS`
```scss
@mixin aspect-ratio($width, $height) {
    position: relative;
    height: 0;
    padding-bottom: #{ ($height / $width) * 100 } + "%";

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.image {
    @include aspect-ratio(16,9);
}
```

<br>

`HTML`
```html
<figure class="image">
    <img src="path/to/img.jpg" />
</figure>
```
