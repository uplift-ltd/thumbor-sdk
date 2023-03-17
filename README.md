# Thumbor SDK

A minimal dependency library for building thumbor urls.

## Installation

```
npm i --save thumbor-sdk
```

```
yarn add thumbor-sdk
```

## Usage

### Thumbor

**Note:** This class requires a security key to be provided, if you need to get the url on the frontend use [UnsafeThumbor](#unsafethumbor) instead.

#### url

```ts
import { Thumbor } from "thumbor-sdk";

const thumbor = new Thumbor({
  endpoint: "http://localhost:8888",
  key: "MY-SECURITY-KEY",
});

const url = thumbor.url("/some/my-img.png", {
  width: 1920,
  height: 1080,
});

console.log(url);
// => http://localhost:8888/Huoc3kthH95DAsvoedAjQB3kleg/1920x1080/some/my-img.png
```

#### sign

```ts
import { Thumbor } from "thumbor-sdk";

const thumbor = new Thumbor({
  endpoint: "http://localhost:8888",
  key: "MY-SECURITY-KEY",
});

const hash = thumbor.sign("/some/my-img.png", {
  width: 1920,
  height: 1080,
});

console.log(hash);
// => Huoc3kthH95DAsvoedAjQB3kleg
```

### UnsafeThumbor

#### url

```ts
import { UnsafeThumbor } from "thumbor-sdk";

const thumbor = new UnsafeThumbor({
  endpoint: "http://localhost:8888",
});

const url = thumbor.url("/some/my-img.png", {
  width: 1920,
  height: 1080,
});

console.log(url);
// => http://localhost:8888/unsafe/1920x1080/some/my-img.png
```

## Sponsors

This library is sponsoed by [Uplift](https://www.uplift.ltd/)!
