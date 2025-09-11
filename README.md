# Forge CLI

Forge is a lightweight NestJS-like scaffolding CLI written in TypeScript.

Usage

# Forge CLI

Forge is a lightweight scaffolding CLI for Node.js + TypeScript. It generates simple modules (controller, service, routes, validation) using Handlebars templates and works with plain Express-style code (no Nest decorators required).

Install (from npm)

You can install Forge globally or run it with npx:

```powershell
npm install -g forge
# or run without installing (downloads/run from npm):
npx forge g module user
```

Quick usage

Generate a module named `user`:

```powershell
forge g module user
```

Behavior
- The generator will prompt where to create the module (Default `src/` or a Custom path).
- Default target → `src/user/` (kebab-case folder and filenames).
- Custom target → `<customPath>/user/`.
- If the target folder already exists the generator will log a warning and skip generation (no overwrite by default).

Generated files (for `forge g module user`)
- `user.controller.ts` — exports `UserController` (plain TypeScript class)
- `user.service.ts` — exports `UserService` (dummy `findAll()` implementation)
- `user.routes.ts` — `registerUserRoutes(app: Express)` registers GET `/users`
- `user.validation.ts` — `UserValidation` with `validateCreateUser(data)` checks
- `user.module.ts` — plain module export (`UserModule`) with references and a `register(app)` helper

Developer workflow
- Build and test locally:

```powershell
npm install
npm run build
npm test
```

- Link locally for rapid manual testing (makes `forge` available in your shell):

```powershell
# Forge CLI

Forge is a lightweight scaffolding CLI for Node.js + TypeScript. It generates simple modules (controller, service, routes, validation) using Handlebars templates and works with plain Express-style code (no Nest decorators required).

## Install (from npm)

You can install Forge globally or run it with npx:

```powershell
npm install -g forge
# or run without installing (downloads/run from npm):
npx forge g module user
```

## Quick usage

Generate a module named `user`:

```powershell
forge g module user
```

## Behavior

- The generator will prompt where to create the module (Default `src/` or a Custom path).
- Default target → `src/user/` (kebab-case folder and filenames).
- Custom target → `<customPath>/user/`.
- If the target folder already exists the generator will log a warning and skip generation (no overwrite by default).

## Generated files (for `forge g module user`)

- `user.controller.ts` — exports `UserController` (plain TypeScript class)
- `user.service.ts` — exports `UserService` (dummy `findAll()` implementation)
- `user.routes.ts` — `registerUserRoutes(app: Express)` registers GET `/users`
- `user.validation.ts` — `UserValidation` with `validateCreateUser(data)` checks
- `user.module.ts` — plain module export (`UserModule`) with references and a `register(app)` helper

## Developer workflow

- Build and test locally:

```powershell
npm install
npm run build
npm test
```

- Link locally for rapid manual testing (makes `forge` available in your shell):

```powershell
npm link
forge g module foo
# when done: npm unlink --no-save forge
```

## Publishing & CI

- The project includes a GitHub Actions workflow that runs tests and builds on push and publishes to npm when a tag matching `v*.*.*` is pushed. Make sure to set the `NPM_TOKEN` repository secret for publishing.

## Notes

- Templates live in `src/templates/*.ts.hbs`. Handlebars context provides `{{Name}}` (PascalCase) and `{{name}}` (kebab-case).
- Node engines: `>=14` (see `package.json`).

## Contributing

- PRs welcome. Suggested workflow:

  1. Fork and create a feature branch
  2. Run tests and build locally
  3. Open a PR against `main`

## License

- MIT
