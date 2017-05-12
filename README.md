# vue-component-generator
> A generator for vue component, support Vue1.X and Vue2.X


## Install

```bash
npm install vue-component-generator -g
```

## Usage

### Init Component

Run command:
```bash
vcg <component-name> -p <port> -n
```
.eg
```bash
vcg component-demo // generate a component named component-demo
vcg component-demo -n // generate a component named component-demo with vue 2.0
vcg component-demo -p 8989 // generate a component named component-demo and set the port to 8989, which webpack-dev-server listen to
```

### Install Dependencies

```bash
npm install
```

### Start Development

```bash
npm run dev
```

### Run Test

```bash
npm run test
```

### Build Component
```bash
npm run build
```
