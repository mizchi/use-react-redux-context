# Minfront

My minimum frontend boilerplate 201811

- yarn
- parcel
- typescript
- jest
- netlify

This code does **not** include framework, ci, and other (production ready) tools.

## Bootstrap

Clone and Run

```bash
# ... Setup node and yarn
$ git clone git@github.com:mizchi-sandbox/minfront.git --depth 1 myspa
$ cd myspa
$ git remote rm origin # optional
$ yarn install
$ yarn dev    # Start app server
$ yarn build  # Build to dist
$ yarn test   # Run jest
$ yarn deploy # Deploy to netlify
```

## Build your own project like this

This project is based on my handy shell command.

```
$ mkdir app_name; cd app_name
$ yarn init -y; git init; gibo dump Node > .gitignore; yarn add typescript -D; yarn tsc --init
```

Optional: Replace `{app_name}` to `your-app-name` and remove README so far.

---

# {app_name}

## How to dev

- `yarn dev`: Start application server on `http://localhost:1234`
- `yarn build`: Generate `dist`
- `yarn test`: Run jest
- `yarn deploy`: Deploy to netlify (need netlify account)

## LICENSE

MIT
