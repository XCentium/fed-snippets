# Paste Plain Text
> by Andrew Aponte

A Vue directive for stripping out any formatting (e.g. bold, italics, colors, etc) when a user copy-and-pastes into an input field or textarea.

First, add the code for the directive:

`src/directives/plain-text.js`
``` js
function noEnter() {
    return (evt) => {
        if (evt.keyCode === 13) {
            evt.preventDefault();
            return false;
        }
    };
}

function noHtml() {
    return (evt) => {
        let text = '';

        evt.preventDefault();

        if (evt.clipboardData || evt.originalEvent.clipboardData) {
            text = (evt.originalEvent || evt).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
        }

        if (document.queryCommandSupported('insertText')) {
            document.execCommand('insertText', false, text);
        } else {
            document.execCommand('paste', false, text);
        }
    };
}

export default {
    bind(el) {
        el.addEventListener('keypress', noEnter());
        el.addEventListener('paste', noHtml());
    },

    unbind(el) {
        el.removeEventListener('keypress', noEnter());
        el.removeEventListener('paste', noHtml());
    },
};

```

<br>

Next, import the directive into your main Vue file (aka the one that bootstraps the app):

`src/main.js`
``` js
import PlainText from './directives/plain-text.js';

Vue.directive('plaintext', PlainText);
```

<br>

Finally, use the directive where you see fit:

`src/components/my-component.vue`
``` vue
<template>
    <textarea v-plaintext></textarea>
</template>
```
