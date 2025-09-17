

# Forge CLI

[![Forge CLI](https://img.shields.io/npm/v/@node-forge/forge?style=flat-square)](https://www.npmjs.com/package/@node-forge/forge)

A powerful scaffolding tool for Node.js/TypeScript projects. Quickly generate controllers, services, modules, and entire project boilerplates with a single command.


## Features

- Scaffold controllers, services, modules, and projects
- Interactive CLI prompts for easy usage
- Supports custom templates
- Configurable via `forge.config.json`
- Dry-run mode for previewing changes
- Colored output and spinners for better UX


## Installation

```sh
npm i -g @node-forge/forge
```

## Usage


### Generate a Controller

```sh
forge g controller User
```


### Generate a Service

```sh
forge g service Auth
```


### Generate a Module

```sh
forge g module Blog
```


### Create a New Project

```sh
forge new my-app
```


### Interactive Mode

Just run `forge` with no arguments:

```sh
forge
```


## Configuration

Add a `forge.config.json` in your project root to set defaults:

```json
{
  "outputPath": "src/generated",
  "namingConvention": "PascalCase"
}
```


## Custom Templates

Place your templates in `.forge/templates/` to override the defaults.


## Roadmap

- [x] Interactive CLI
- [x] Config file support
- [x] Dry-run mode
- [x] Custom templates
- [ ] Plugin system for new resource types
- [ ] Project type presets (REST, GraphQL, etc.)
- [ ] Auto-generate documentation
- [ ] More advanced testing and CI


## Contributing

PRs and issues welcome!


## License

MIT
