# Animated Mobile Menu Button
> by Andrew Aponte

This will generate a button that looks like the typical hamburger menu icon by default, but when activated will smoothly transition into an "X" icon.

To trigger the activated state, add an "is-active" class.

<br>

`Demo`

<br>

<animated-mobile-button></animated-mobile-button>

<br><br>

`HTML`
``` html
<!-- inactive -->
<button type="button" class="menu-button">
    <div>
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>

<!-- active -->
<button type="button" class="menu-button is-active">
    <div>
        <span></span>
        <span></span>
        <span></span>
    </div>
</button>
```

<br>

`CSS`
``` css
.menu-button {
    padding: 7px;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.menu-button div {
    display: block;
    position: relative;
    width: 26px;
    height: 3px;
    margin: 9px 0;
}

.menu-button span {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s, 0.3s;
    background-color: #222;
}

.menu-button span:nth-child(1) {
    transform: translateY(-8px);
}

.menu-button span:nth-child(3) {
    transform: translateY(8px);
}

.menu-button.is-active span:nth-child(1) {
    transform: rotate(45deg);
}

.menu-button.is-active span:nth-child(2) {
    background-color: transparent !important;
}

.menu-button.is-active span:nth-child(3) {
    transform: rotate(-45deg);
}
```
