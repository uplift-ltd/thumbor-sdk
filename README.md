# Thumbor SDK

A minimal dependency library for building thumbor urls.

## Installation

```
npm i --save thumbor-sdk
```

```
yarn add thumbor-sd
```

## Usage

### Thumbor

```ts
import { Thumbor } from "thumbor-sdk";

const thumbor = new Thumbor({
  url: "https://thumbor.example.com",
  securityKey: "MY-SECURITY-KEY",
});

const url = thumbor.url("/my-image.jpg", { width: 800, height: 400 });

const signature = thumbor.sign("/my-image.jpg", { width: 800, height: 400 });
```

## Sponsors

This library is sponsoed by [Uplift](https://www.uplift.ltd/)!
