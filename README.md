# Forge CLI 🚀

Forge is a powerful, lightweight scaffolding CLI for Node.js and TypeScript projects. It helps you generate modules (including controllers, services, routes, and validation files) with a single command, following the patterns of frameworks like NestJS but without the need for decorators or complex configurations.

## Features

-   **Interactive Generation**: Prompts for destination paths.
-   **File Scaffolding**: Generates organized, feature-based modules.
-   **Customizable Templates**: Uses Handlebars for easy template modification.
-   **No Overwrites**: Protects existing code by default.
-   **Cross-Platform**: Works seamlessly on Windows and Linux.

## Installation

You can install Forge globally or use it directly with `npx`.

```bash
npm install -g @node-forge/forge
```

## Usage

### Generating a Module

To generate a complete module (controller, service, routes, validation, and module file), use the `g module` command:

```bash
npx @node-forge/forge g module <module-name>
```

**Example:**

```bash
npx @node-forge/forge g module user
```

This will create a `user` directory containing:
- `user.controller.ts`
- `user.service.ts`
- `user.routes.ts`
- `user.validation.ts`
- `user.module.ts`

### Generating a Resource

The `g resource` command is an alias for `g module` and provides the same functionality:

```bash
npx @node-forge/forge g resource <resource-name>
```

### Generating Individual Components

You can also generate individual files for a module:

-   **Controller**: `npx @node-forge/forge g controller <name>`
-   **Service**: `npx @node-forge/forge g service <name>`

### Interactive Mode

By default, Forge runs in interactive mode, asking you where to generate the files:

```
? Where do you want to generate the module? (Use arrow keys)
> Default (src/)
  Custom Path
```

If you select "Custom Path," you will be prompted to enter a relative path from your project root.

## Development

To contribute to Forge or run it locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RahulManu79/forge.git
    cd forge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build the project:**
    ```bash
    npm run build
    ```

4.  **Link the package for local testing:**
    ```bash
    npm link
    ```

Now you can use the `forge` command globally on your system.

```bash
forge g module my-feature
```

## License

This project is licensed under the MIT License.


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
