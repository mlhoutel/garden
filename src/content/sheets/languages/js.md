---
title: "JavaScript"
short: "High-level, dynamically-typed language, easy of use and flexible"
topic: programming-language web
---

## Programming in JS

### First Program : webpage

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Space Invader</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    <body>
    </body>
</html>

<script type="text/javascript">
    /*
        We must wait that the web page is fully loaded before beggining
        to access and edit it's components (We wait DOMContentLoaded)
    */
    document.addEventListener("DOMContentLoaded", function() {

        /* 
            We can read the elements in the page with selectors.
            We store it into a variable with: let v = ...  
        */
        let body = document.querySelector("body")

        /*
            You can use console.log(...) to display text or objects 
            in the web browser console (Ctrl + Shift + J for Chrome)
        */
        console.log("Document loaded")
    })
</script>

<style type="text/css">
    * {
        padding: 0px;
        margin: 0px;
    }
</style>
```

### Variables

JavaScript is Dynamically typed. There is 'types' but they are computed on the go, you cannot statically declare the type of a
variable. That's one of the reasons why JS is not a fast language.

TypeScript has been created to fix this by enabling the declaration of the type, but it's ony a pre-check, because in the end it's also compiled in JS.

``` js
/* Declare with LET */
let a = 'A' /* This is my default declaration for the variables */
let b /* You can also declare a variable without assigning it a value */
let c = 15 /* The variable type is automaticly computed... */
c = 'test' /* ...but no problem for assigning it everithing, no parse needed*/

/* 
    Let is a local definition, you can only access it in the current bloc.
    To create global variables, just declare them outside the main bloc. 
*/
function() { 
    let d = 'my local variable' 
    console.log(d) /* 'my local variable' : we are inside the bloc */ 
}
console.log(d) /* undefined : we are outside the bloc were d is defined */

/* Declare with VAR */

/* 
    Var is the same as Let but it's permit to declare variables in the Global 
    condext: it attach the var to the 'window' object instead of the bloc
*/
function() { 
    var e = 'my global variable' 
    console.log(e) /* 'my global variable' */ 
}
console.log(e) /* 'my global variable' */
console.log(window.e) /* 'my global variable' */

/* Declare with CONST */
const NUMBER = 1 /* const must be defined when declarated and cannot be edited */
```

### Console Log

Console log display the items passed by parameters

``` js
/* Text */
console.log('test here') 

/* Array */
console.log([{ id: 0, name: 'A'}, { id: 1, name: 'B'}, { id: 2, name: 'C'}])
(3) [{…}, {…}, {…}]
    > 0: {id: 0, name: "A"}
    > 1: {id: 1, name: "B"}
    > 2: {id: 2, name: "C"}
    length: 3
    > __proto__: Array(0)

/* Text */
console.log('Insert %s here','text')
/*
    You can interpolate values with flags:
    %s (string)
    %d (decimal)
    %j (json)
    %O (object with depth of 4)
    %o (object with depth of 2)
*/

console.error() /* For errors */
console.dir() /* For directories */
class Console /* Create a console object */
```

### Tests

``` js
if (/* Condition */) {
    /* Code */
} else if (/* Condition */) {
    /* Code */
} else {
    /* Code */
}
```

### Loops

``` js
for (let i = 0; i < 10; i++) {
    /* 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 */
}

do {
    /* Code */
} while (/* Condition */)

while (/* Condition */) {
    /* Code */
}

let items = ['A','B','C']

for (let i in items) {
    console.log(i) /* 0, 1, 2 */
    items[i] /* A, B, C */
}

for (let i of items) {
    console.log(i) /* A, B, C */
}
```

### Functions

``` js
/* Parameters with default values become optionnal */
function print(parameter = 0) {
    console.log(parameter)
    return true /* You can choose to return something or not */
}

print() /* 0 */
print('test') /* 'test' */

/* You can also declare functions like this */
let func = () => 'test' /* this function just return 'test' */
console.log(func()) /* 'test' */

let func = (parameterA, parameterB ...) => {
    /* Code */
}
```

### Selectors

``` js
console.log(document) /* reference all the informations on the current page */

/* Get elements with querySelector */
let body = document.querySelector("body") /* We select the html element body */ 
document.querySelector("#idObject") /* We cans select object like in css, with the id... */
document.querySelector(".classObject") /* ... and the class, but it only return the first */
document.querySelectorAll(".classObject") /* To get all items in an array, we use querySelectorAll */

/* Get elements with getElementById */
document.getElementById('idObject') /* We can get the first*/

/* Get elements with getElementByClassName */
document.getElementByClassName('classA classB ...') /* We get the array of all elements that have both classes */
document.getElementByClassName('class')[0] /* ... to get the first element of the list */
```

### Events

``` js
setTimeout(function() { /* Code */ }, 5000) /* After 5000ms */
setInterval(function() { /* Code */ } 3000) /* Every 3000ms */

element.addEventListener('click', function(event) { /* Code */ })

function().then(function(data) { /* Code */ }).catch(function(error) { /* Code */ })

async function asynchrone() { 
    let value = await function() { /* Code */ }
    return value
}

try { /* Code */ } catch (error) { /* Code */ }
```

## Typescript

> TODO

## Ajax

``` js
function Send(url, params, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.responseType = "json";
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            callback(xhr.response);
        }
    }
    let s = "";
    for (let attr in params) s += attr + "=" + params[attr] + "&";
    xhr.send(s);
}

function Get(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {

            let data = JSON.parse(xhr.responseText);
            resolve(data)
            //console.log(data[0]);
        }
        xhr.onerror = reject;
        xhr.send();		
    });
}
```

## p5

> TODO

## NodeJs

> "NodeJs is an open source cross-plateform back-end JavaScript
> Environment that execute javaScript outside a web browser. It was build
> in 2009 in JavaScript and in C/C++ where JavaScript was performing too
> slow. Node use V8 to compile JS source code to native machine code at
> runtime.

Download Node: <https://nodejs.org/en/download/>

```sh
node --version

node
> 2 + 2
4
> .help
> .exit

node file.js
```

Node Package Manager (npm)

```sh 
npm install package
npm view package
npm search package
npm help
npm version
npm list
npm update /* update all packages */
npm init /* Tool to initialize package.js */

npm test
npm start
npm run serve
```

Node Path System (path)

``` js
const path = require('path')
console.log('src' + path.sep + 'file')
console.log(path.join('src','file'))

path.basename(path) /* file name */
path.dirname(path) /* folder name */
path.extname(path) /* file extention */
path.isAbsolute(path) /* false if relative */
path.relative(pathA, pathB) /* return relative path to go from A to B */
path.resolve('path',step,step,...) /* return the absolute path after completing the steps */
```

Node File System (fs)

``` js
const fs = require('fs')
const path = require('path')
const filename = path.join(__dirname, 'file") 
/*
    __dirname: current repertory
    __filename: current file
*/

fs.readFile(filename, (err, res) => {
    console.log(String(res))
})

fs.readDir(path, (err, res) => {
    console.log(res) /* files and subfolders */
})

fs.mkdir(path, (err) => {}) /* make folder */
fs.copyFile(file, path, (err) => {}) /* copy file */
fs.rename(file, new, (err) => {}) /* rename file/folder */
fs.rmdir(path, (err) => {}) /* remove folder if empty */
fs.unlink(path, new, (err) => {} /* remove file*/
```

Server HTTP (http)

``` js
const http = require('http')
const server = http.createServer()
server.listen(4000, 'localhost')

server.on('request', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    res.write('Hello world')
    res.end()
})
```

## Jest

Unit Testing

``` sh
npm install jest --save-dev

mkdir src/utils/__tests__
cd src/utils/__tests__
echo.>Element.spec.js

/* Run tests */
npm test --coverage 
```

``` sh 
package.json

"scripts": {
    "test": "jest"
},
"jest": {
    "collectCoverage": true,
}
```

``` sh 
src
└───test
    ├───smoke
    └───unit
        ├───coverage
        └───specs // units tests here
```

``` js
import Element from 'src/element' /* With Babel*/
const Element = required('src/element') /* Without Babel*/

jest.mock('library') /* if the element use an external library */

/* Describle contain one or more related tests */
describle('description string', () => {

    /* Before each test */
    beforeEach(() => {
        /* Environment setup */
        process.env = {
            /* Environment variables setup */
        }       
    })

    /* After each test */
    afterEach(() => {
        /* Clean things */
    })

    /* You then describle your tests with: test or it (alias) */
    it('test description', () => {
        /* Variables Setup */
        const input = [
            { id:0, name:'A' }, 
            { id:0, name:'B' }, 
            { id:0, name:'C' } 
        ]
        const output = [{ id:0, name:'B' }]
        const spy = jest.spyOn(object, 'function')

        /* Function Test */
        // [...]

        /* Assertions */
        expect(/*...*/).toEquals(output) /* Result */
        expect(spy).toHaveBeenCalledTimes(1) /* Spy */
        expect(/*...*/).toMatch('Error") /* Errors */
    })

    it('async test description', async () => {
        /* Here we test with an async function */
    })
}
```

### Cypress

Integration Testing

``` js
install global cypress: npm install -g cypress

cypress run -P . --config video=false --spec '**/integration/test.spec.js' -b chrome
cypress open -P .
```

``` sh
src
└───cypress
    ├───support
    |   ├───index.js
    |   └───commands.js
    └───tests
        ├───smoke
        └───integration
            └───test.spec.js // integration tests here
```

``` js
support/index.js

Cypress.on("window:before:load", function(window){
    const original = window.EventTarget.prototype.addEventListener

    window.EventTarget.prototype.addEventListener = function() {
        if (argument && argument[0] === "beforeunload") { return }
        return original.apply(this, arguments)
    }

    Objet.defineProperty(window, "beforeunload", {
        get: function() {},
        set: function() {}
    })
})
```

``` js
support/commands.js

//<button type="button" data-test="mybutton">Button</button>

Cypress.Commands.add("SelectMyButton", () => {
    return cy.get('[data-test="mybutton"]')
})

Cypress.Commands.add("ClickMyButton", () => {
    cy.SelectMyButton().click()
})
```

``` js
integration/test.spec.js

describle("Tests description", function() {

    const BUTTON_CLICKED = "clicked"

    beforeEach(() => { /* ... */ })
    afterEach(() => { /* ... */ })

    it("Test description", function() {
        cy.ClickMyButton()
        cy.contains(BUTTON_CLICKED)
    })

    /* ... */
})
```


# JS-BUNDLING

## Comparison

### For CLI tools

| Name                                                | Note                                 | Free license | Mainained      | Binaries                                                               |
|-----------------------------------------------------|--------------------------------------|--------------|----------------|------------------------------------------------------------------------|
| [pkg](https://github.com/vercel/pkg)                | Node bundler          | ✅ MIT        | ✅ Active       | [v18 x64-86](https://github.com/vercel/pkg-fetch#binary-compatibility) |
| [nexe](https://github.com/nexe/nexe)                | Node bundler         | ✅ MIT        | ✅ Active       | [v16 x64-86](https://github.com/nexe/nexe/releases/tag/v3.3.3)         |
| [enclose](https://github.com/igorklopov/enclose)    | Node bundler      | ❌ EULA       | ❌   Deprecated | [v6 x64](https://github.com/igorklopov/enclose#versions-of-nodejs)     |
| [node-packer](https://github.com/pmq20/node-packer) | Node bundler  | ✅ MIT        | ❌  No (2y)     |                                                                        |
| [deno-build](https://github.com/denoland/deno)      | Deno compiler  | ✅ MIT | ✅ Active | 
### For GUI tools

| Name                                                 | Note                              | Free license | Mainained | Binaries                                              |
|------------------------------------------------------|-----------------------------------|--------------|-----------|-------------------------------------------------------|
| [nwjs](https://github.com/nwjs/nw.js)                | Chromium bundler  | ✅ MIT        | ✅ Active  | [v18 x64-86](https://github.com/nwjs/nw.js#downloads) |
| [electron](https://github.com/electron/electron)     | Chromuim bundler  | ✅ MIT        | ✅ Active  |                                                       |
| [tauri](https://github.com/tauri-apps/tauri)         | Rust bundler  | ✅ MIT        | ✅  Active |                                                       |
| [app-image](https://github.com/AppImage/appimagekit) | Packager     | ✅ MIT        | ✅  Active |                                                       |

## Pkg

 * 1. Bundles the application with a custom v8 script compiler into a snapshot
 * 2. Downloads the node source (or a prebuilt binary)
 * 3. Applies arbitrary source patches
 * 4. Maybe compiles downloaded source
 * 5. Appends snapshotted output to the end of the binary
 * 6. Snapshot (cachedData from v8) is loaded/run when binary executes.

*from https://github.com/vercel/pkg/issues/42*


> "Pkg hacked fs.* API's dynamically in order to access in-package files, whereas Node.js Compiler leaves them alone and instead works on a deeper level via libsquash. Pkg uses JSON to store in-package files while Node.js Compiler uses the more sophisticated and widely used SquashFS as its data structure."

pkg:
- a lot of configuration possible (see [usage settings](https://github.com/vercel/pkg#usage))
- best support for distributed node binaries
- support multiple builds at a time
- configuration in json or by command line (see [config](https://github.com/vercel/pkg#config))
- option to build the node binaries ourself with `--build`
- don't work well with ES6 modules (use `require`) => or see `nexe`

### File System

"Hence, in order to make use of a file collected at packaging time (require a javascript file or serve an asset) you should take `__filename`, `__dirname`, `process.pkg.defaultEntrypoint` or `require.main.filename` as a base for your path calculations.

For javascript files you can just require or require.resolve because they use current `__dirname` by default. For assets use `path.join(__dirname, ``'../path/to/asset')`"
*from https://github.com/vercel/pkg#snapshot-filesystem*

### Node binaries fetcher

- [Node binaries fetcher (and distrib)](https://github.com/vercel/pkg-fetch)
- [Targets and build documentation](https://github.com/vercel/pkg#targets)

Supported:
- `alpine, linux, macox, windows (x32/64)`
- `node <= v18`

### Details

Building in `DEBUG` mode:

```
pkg -o dist/panorama.exe src/index.js --debug > build_log.txt
```

\[**[cernbox build_log.txt](https://cernbox.cern.ch/index.php/s/edFZJijSs1aV2Ic)**\]

**1.1.** Navigate dependandancies from the scipt input and add them to the queue
```
[debug] Content of /home/user/Documents/Projects/panorama/node_modules/nodemon/package.json is added to queue.
It was required from /home/user/Documents/Projects/panorama/src/index.js

[debug] Bytecode of /home/user/Documents/Projects/panorama/node_modules/nodemon/lib/nodemon.js is added to queue.
It was required from /home/user/Documents/Projects/panorama/src/index.js
...
```

**1.2.**  Resolve ambiguous paths
```
[debug] Path.resolve('.') is ambiguous
/home/user/Documents/Projects/panorama/src/system.js
It resolves relatively to 'process.cwd' by default, however
you may want to use 'path.dirname(require.main.filename)'
```

**1.3.**  Directories and stats added to the VFS
```
[debug] Directory /home/user/Documents/Projects/panorama/node_modules/jsdom/lib/jsdom/living is added to queue.
```
**1.4.** Convert to bytecode and add 
```
[debug] The file was included as bytecode (no sources)
/home/user/Documents/Projects/panorama/src/index.js

The file was included as DISCLOSED code (with sources) 
/home/user/Documents/Projects/panorama/node_modules/nodemon/package.json
```

"By default, your source code is precompiled to v8 bytecode before being written to the output file"
*from https://github.com/vercel/pkg#bytecode-reproducibility*

**1.5** Merge required sources
```
> [debug] files & folders deduped = 
  index.js
  inputs.js
  system.js
  parsing.js
```

**With config**
```
[debug] Targets:
  [
  {
    "nodeRange": "node16",
    "platform": "linux",
    "arch": "x64",
    "output": "/home/user/Documents/Projects/panorama/dist/panorama.exe",
    "forceBuild": false,
    "fabricator": {
      "nodeRange": "node16",
      "platform": "linux",
      "arch": "x64",
      "binaryPath": "/home/user/.pkg-cache/v3.4/fetched-v16.16.0-linux-x64"
    },
    "binaryPath": "/home/user/.pkg-cache/v3.4/fetched-v16.16.0-linux-x64"
  }
]
```

**Running the binary**

`DEBUG_PKG=1 ./panorama`

\[**[cernbox run_log.txt](https://cernbox.cern.ch/index.php/s/4B7PMFGAR9qjCJk)**\]

```
------------------------------- virtual file system
/snapshot
  panorama                                 8993610 
    src                                      10864 
      index.js                                1607 
      inputs.js                               1992 
      system.js                               2778 
      parsing.js                              4487 
    node_modules                           8993610 
      nodemon                               125479 
        package.json                          2189 
        lib                                  85174 
          nodemon.js                          8777 
          version.js                          2465 
          spawn.js                            1893 
          monitor                            43382 
            index.js                            82 
            run.js                           16493 
```

**Building without including sources as bytecode**

```
...
--public             speed up and disclose the sources of top-level project
--no-bytecode        skip bytecode generation and include source files as plain js
...
```

"Specifying `--no-bytecode` will fail if there are any packages in your project that aren't explicitly marked as public by the license in their package.json."
*from https://github.com/vercel/pkg#other-considerations*

#### New simple js project specified as OS (no dependancies)

*index.js*
```
function main() {
    console.log("Hello world")
}

main()
```

*package.json*
```
{
  "name": "decompiled",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "node index.js",
    "build": "pkg --public --no-bytecode index.js --debug -o dist/decompiled"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pkg": "^5.8.0"
  }
}
```

**/!\ MUST ADD BOTH `--no-bytecode` AND `--public`**
otherwise `Error! --no-bytecode and no source breaks final executable`
*see https://github.com/vercel/pkg/issues/1139*

... still not working

![screenshot](https://codimd.web.cern.ch/uploads/upload_5df2ef2a5ebde634ba2a0ecfb1331f2a.png)

#### Some readable parts 

![screenshot](https://codimd.web.cern.ch/uploads/upload_3f686fde8d43f62b1e8fe7baaff084d7.png)

from decompiled linux binaries

- [headers.js](https://cernbox.cern.ch/index.php/s/NMDb4wb8spG45VI)
- [modules.json](https://cernbox.cern.ch/index.php/s/ivsyWmB0X22mAZ1)

| ?   | node binaries | ?   | ?   | code ? | modules |
| --- | ------------- | --- | --- | ------ | ------- |


## Nexe

 * 1. Bundles the application if desired using webpack.
 * 2. Downloads node source (or a prebuilt binary)
 * 3. Adds your application bundle as a native module (like fs, http, path etc)
 * 4. Applies arbitrary source patches.
 * 5. Maybe compiles downloaded source
 * 6. Inserts bundle into pre-sized binary
 * 7. Code is run as main when executable is run (instead of the repl)

Nexe does not support dynamic require because of its use of browserify, whereas Node.js Compiler supports all kinds of require including require.resolve.

https://github.com/nexe/nexe/issues/529

> Nexe is a tool for compiling node. You can apply arbitrary patches and build plugins for repeatable patterns to that end. ie. You could make a plugin and or patch for nexe that bypasses the nexe application bundler and uses the same approach as pkg.

Application Bundling (just different approaches):

- nexe uses a virtual filesystem (similar to tools like asar for electron) and module analysis to include your applications files and dependencies
- pkg uses module analysis, and whitelists to create a V8 snapshot and load ("compile") your application scripts.
    
Why use nexe ?

- You need to have additional customizations to node (eg more builtin or native modules, C++ patches).
- You want to codesign the executable. By bypassing the built in bundler (with a patch) you can create an application executable that can be signed/verified.
- You want to add an icon (there are lots of ways to accomplish this, but code is usually the best way)
- You want to extend it (plugin or patch) to provide a repeatable system for creating a specific type of application. Eg. a windows service or linux daemon.
- Its hosted builds are created with 100% OSS.
- It allows the JS engine to recompile in the future if it made bad predictions for hot code paths. (since it uses unchanged source, vs a snapshot. (This point is less relevant with the newer interpreter features)
- It provides pre-built versions for any node version.

## Enclose

http://enclosejs.com/

- JavaScript code is transformed into native code at compile-time using V8 internal compiler. Hence, your sources are not required to execute the binary, and they are not packaged.

- Optimized native code can be generated only at run-time, using information collected at run-time. Without that information EncloseJS can generate only “unoptimized” code. It runs about 2x slower, than optimized one.

- Also, Node.js code is put inside the executable (along with your code) to support Node.js API for your application at run-time. This increases output file size.

- So, this is not that static compilation we used to know. But nevertheless you get fully functional binary without sources. Also, performance and file size overhead are vectors of future work.

## Node-packer

https://speakerdeck.com/pmq20/node-dot-js-compiler-compiling-your-node-dot-js-application-into-a-single-executable?slide=5

## Nwjs

https://github.com/nwjs/nw.js/wiki/How-to-package-and-distribute-your-apps

https://www.sitepoint.com/cross-platform-desktop-app-nw-js/

https://stackoverflow.com/questions/8173232/how-to-make-exe-files-from-a-node-js-app


* 1. Zip up all your files, with a package.json in the root
* 2. Change the extension from .zip to .nw
* 3. copy /b nw.exe+app.nw app.exe


## Electron

### Asar

Asar uses JSON to store files information while Node.js Compiler uses SquashFS. Asar keeps the code archive and the executable separate while Node.js Compiler links all JavaScript source code together with the Node.js virtual machine and generates a single executable as the final product.

## Tauri

https://github.com/tauri-apps/tauri

| Detail                     | Tauri  | Electron             |
|----------------------------|--------|----------------------|
| Installer Size Linux       | 3.1 MB | 52.1 MB              |
| Memory Consumption Linux   | 180 MB | 462 MB               |
| Launch Time Linux          | 0.39s  | 0.80s                |
| Interface Service Provider | WRY    | Chromium             |
| Backend Binding            | Rust   | Node.js (ECMAScript) |
| Underlying Engine          | Rust   | V8 (C/C++)           |
| FLOSS                      | Yes    | No                   |
| Multithreading             | Yes    | Yes                  |
| Bytecode Delivery          | Yes    | No                   |
| Multiple Windows           | Yes    | Yes                  |
| Auto Updater               | Yes    | Yes1                 |
| Custom App Icon            | Yes    | Yes                  |
| Windows Binary             | Yes    | Yes                  |
| macOS Binary               | Yes    | Yes                  |
| Linux Binary               | Yes    | Yes                  |
| iOS Binary                 | Soon   | No                   |
| Android Binary             | Soon   | No                   |
| Desktop Tray               | Yes    | Yes                  |
| Sidecar Binaries           | Yes    | No                   |

## Deno-build

https://deno.land/manual/tools/compiler

## AppImage

AppImage supports only Linux with a kernel that supports SquashFS, while Node.js Compiler supports all three platforms of Linux, macOS and Windows, meanwhile without any special feature requirements from the kernel.

https://appimage.org/

https://docs.appimage.org/introduction/motivation.html

https://docs.appimage.org/introduction/software-overview.html#ref-appimagekit