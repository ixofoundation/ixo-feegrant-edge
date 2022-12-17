

![GitHub contributors](https://img.shields.io/github/contributors/ixofoundation/ixo-feegrant-edge)
![GitHub repo size](https://img.shields.io/github/repo-size/ixofoundation/ixo-feegrant-edge)
![Twitter Follow](https://img.shields.io/twitter/follow/ixoworld?style=social)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
# IXO-FEEGRANT-EDGE

This is a ixo feegrant daemon for Cloudflare Workers. It enables a feegrant mechanism on the edge for cosmnos based blockchains.

## Features

- Minimal
- TypeScript
- Wrangler to develop and deploy.


## Usage

Install

```
yarn install

yarn add wrangler --global
```

Develop

```
yarn dev
```

Test

```
yarn test
```

Deploy

```
yarn deploy
```

Add your Mnemonic Secret key housed in the secret manager tool of cloudflare.

```
wrangler secret put FEEGRANT_MNEMONIC
```



## Author

Andrew Margetts <https://github.com/demondayza>

## License

MIT

