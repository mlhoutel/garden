# Garden

<a href="https://github.com/mlhoutel/garden/blob/master/.github/workflows/deploy.yml" alt="Build">
  <img src="https://img.shields.io/github/actions/workflow/status/mlhoutel/garden/deploy.yml?style=flat-square" />
</a>

<a href="https://github.com/mlhoutel/garden/blob/main/package.json" alt="Version">
  <img src="https://img.shields.io/github/package-json/v/mlhoutel/garden?style=flat-square&color=informational" />
</a>

<a href="https://github.com/mlhoutel/garden/search?l=svelte" alt="Language">
  <img src="https://img.shields.io/github/languages/top/mlhoutel/garden?style=flat-square&color=orange" />
</a>

<a href="https://github.com/mlhoutel/garden/blob/main/LICENSE/" alt="License">
  <img src="https://img.shields.io/github/license/mlhoutel/garden?style=flat-square&color=yellow" />
</a>

&nbsp;&nbsp;

<p align="center">
  <a href="https://mlhoutel.github.io/garden/"><img src="./static/logos/sumgrad.svg" width="100px" /></a>
</p>
  
&nbsp;&nbsp;

_Welcome to my digital garden, a collection of my thoughts, ponderings, and notes on various topics! Here you'll find blog posts that delve into topics that interest me, help sheets that are quick reference guides, and demos of small, fleeting projects. Whether you want to learn something new or just explore different perspectives, I hope you find something useful here. Thanks for visiting!_ [browse website](https://mlhoutel.github.io/garden/)

## License

The source code for this site is licensed under version 2.0 of the the [Mozilla Public License](./LICENSE.md). See the licence file. The content of the posts is licensed under the Creative Commons BY SA licence.

## Compiling

1. fetch the source code from github

```
git clone https://github.com/mlhoutel/garden
```

2. install the node dependancies

```
npm install
```

> Currently, [June 2023] the choice was made to bump up the libs towards svelte 4.0. The [mdsvex](https://github.com/pngwn/MDsveX) lib don't officialy support this version, so for now, the install should be done with `npm i --force`.

3. start a local development server

```
npm run start
```

4. build the website for release

```
npm run build
```

5. start a release preview

```
npm run preview
```
