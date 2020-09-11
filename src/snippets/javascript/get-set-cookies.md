# Get or Set Cookie Values
> by Andrew Aponte

This allows you to get/set cookie values without needing to pull in any third-party libraries.

<br>

`JS`
```js
function getCookie(key) {
    const b = document.cookie.match(`(^|[^;]+)\\s*${ key }\\s*=\\s*([^;]+)`);

    return b ? b.pop() : null;
}

// by default, expire the cookie after 1 year
const OneYearInSeconds = 31536000;

function setCookie(key, value, maxAgeInSeconds = OneYearInSeconds) {
    document.cookie = `${ key }=${ value };max-age=${ maxAgeInSeconds };path=/`;
}
```