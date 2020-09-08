# Deep Clone Object
> by Andrew Aponte

A quick and dirty way to deep clone a JavaScript object.

<br>

`JS`
```js
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
```
