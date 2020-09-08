# Custom Hook
> by Andrew Aponte

This demonstrates how to create and use custom hook in React. The example below keeps track of a counter, which could be anything - a mouse click counter, product quantity tracker, etc.

First, create a file for the custom hook:

`src/hooks/counter.js`
```js
import { useState } from 'react';

export function useCounter() {
    const [count, setCount] = useState(0);

    window.setTimeout(() => {
        setCount(count + 1);
    }, 2000);

    return count;
}
```

<br>

Then, import and use the hook:

`src/components/foo.js`
```jsx
import { useCounter } from '../hooks/counter.js';

export function Foo {
    const currentCount = useCounter();

    return (
        <p>
            The count is <strong>{ currentCount }</strong>.
        </p>
    );
}
```
