# IXO-FEEGRANT-EDGE

This is a ixo feegrant daemon for Cloudflare Workers.

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

