# Forge CLI

Forge is a lightweight NestJS-like scaffolding CLI written in TypeScript.

Usage

- Build: npm run build
- Link locally: npm link (after install deps) to use the `forge` command
- Generate: forge g module User

Commands
- forge g <type> <name>
  - type: module | service | controller | resource

Step-by-step examples

1) Install dependencies and build

```powershell
npm install
npm run build
```

2) Link locally (makes `forge` available globally in your shell)

```powershell
npm link
```

3) Generate a single module

```powershell
forge g module User
```

4) Generate a full resource (module + service + controller)

```powershell
forge g resource User
```

5) Use interactive prompt to confirm creation

```powershell
forge g service User --interactive
```

Notes

- Generated files are placed under `src/<kebab-name>/`.
- Class names are PascalCase (e.g. `UserService`) and files are kebab-case (e.g. `user.service.ts`).
- The templates live in `src/templates/*.ts.hbs`. They use `{{Name}}` for class names and `{{name}}` for kebab-case filenames.

Development tips

- To test changes to the CLI quickly after code edits, run `npm run build` and use `node dist/cli.js g module Foo`.
- To unlink: `npm unlink --no-save forge`.
