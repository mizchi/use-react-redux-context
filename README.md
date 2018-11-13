# Minfront

My minimum frontend boilerplate 201811

- yarn
- parcel
- typescript
- netlify

This code does **not** include these.

- framework
- PWA
- test, e2e
- CI
- server
- performance metrics (like lighthouse)

I reccomend `$ pwmetrcis http://localhost:1234` by https://github.com/paulirish/pwmetrics/

## How to dev

Clone and run.

```bash
# Install node and yarn
$ git clone git@github.com:mizchi-sandbox/minfront.git your_app_name
$ yarn install
```

Optional: Replace `{app_name}` to your_app_name

- `yarn dev`: Start server on `http://localhost:1234`
- `yarn build`: Generate SPA to `dist`
- `yarn deploy`: Deploy to netlify (need netlify account)

## LICENSE

MIT
