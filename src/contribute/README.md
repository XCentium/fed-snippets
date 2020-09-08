# How to Contribute

### 1. Get Repo Access
If you have not done so already, request access to the repo from one of the FE leads - **Andrew Aponte**, **Leslie Jasper**, **Chris Castle**, or **Erik Aponte**.

<br>

### 2. Run the App Locally
```
npm install
npm run dev
```

<br>

### 3. Add Code Snippets
- Add a markdown file to the appropriate folder under `src/snippets`, using the following template:

````markdown
# Awesome Snippet
> by John Doe

Aliquet etiam adipiscing suspendisse mus curabitur ultricies.

<br>

`JS`
```js
function myFunc() {
    // do something
}
```
````

... remember to change the file extension (aka the part after the three backticks) so that your code displays the appropriate syntax highlighting.

- Add a link to your file in the sidebar nav, by editing `src/.vuepress/config.js`

<br>

### 4. Run a build and commit your changes
```
npm run build
git add . --all
git commit -m 'your commit message here`
git push
```

