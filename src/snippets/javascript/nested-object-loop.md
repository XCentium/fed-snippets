# Nested Object Loop
> by Andrew Aponte

This allows you to loop through each property of an object, including nested objects - while firing a callback function for each key/value pair.

<br>

`JS`
```js
export function walkObject(obj, callback) {
    function walk(parentObj) {
        Object.entries(parentObj).forEach((entry) => {
            const [key, value] = entry;

            callback(parentObj, key, value);

            if (value && typeof value === 'object') walk(value)
        });
    }

    walk(obj);
}
```