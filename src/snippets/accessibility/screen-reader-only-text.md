# Screen Reader Only Text
> by Andrew Aponte

This is for adding text that should be invisible to users, but accessible to screen readers.

`HTML`
``` html
<span class="sr-only">Add some message here for screen readers.</span>
```

<br>

`CSS`
``` css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}
```
