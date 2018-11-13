# Minfront

My minimum frontend boilerplate 201811

- yarn
- parcel
- typescript
- netlify

This code does **not** include framework, test, ci, and other tools.

## Bootstrap

Clone and run.

```bash
# Install node and yarn
$ git clone --bare git@github.com:mizchi-sandbox/minfront.git your_app_name
$ yarn install
```

## Build your own project like this

This project is based on my handy shell command.

```
$ mkdir app_name; cd app_name
$ yarn init -y; git init; gibo dump Node > .gitignore; yarn add typescript -D; yarn tsc --init
```

---

# {app_name}

## How to dev

Optional: Replace `{app_name}` to your_app_name

- `yarn dev`: Start server on `http://localhost:1234`
- `yarn build`: Generate SPA to `dist`
- `yarn deploy`: Deploy to netlify (need netlify account)

Just run it.

## LICENSE

MIT
