# @gui-chat-plugin/switch-role

[![npm version](https://badge.fury.io/js/%40gui-chat-plugin%2Fswitch-role.svg)](https://www.npmjs.com/package/@gui-chat-plugin/switch-role)

A switch-role plugin for [MulmoChat](https://github.com/receptron/MulmoChat).

## Overview

This plugin allows users to switch between different AI assistant roles/personas during a conversation. Each role can have different system prompts and available plugins.

## Installation

```bash
yarn add @gui-chat-plugin/switch-role
```

## Usage

### Vue Implementation (for MulmoChat)

```typescript
// In src/tools/index.ts
import SwitchRolePlugin from "@gui-chat-plugin/switch-role/vue";

const pluginList = [
  // ... other plugins
  SwitchRolePlugin,
];

// In src/main.ts
import "@gui-chat-plugin/switch-role/style.css";
```

### Core Only (Framework-agnostic)

```typescript
import { pluginCore, TOOL_NAME, setRoles, getRoles } from "@gui-chat-plugin/switch-role";
```

### Configuring Roles

```typescript
import { setRoles } from "@gui-chat-plugin/switch-role";

setRoles([
  { id: "assistant", name: "General Assistant" },
  { id: "coder", name: "Coding Expert" },
  { id: "writer", name: "Creative Writer" },
]);
```

## Package Exports

| Export | Description |
|--------|-------------|
| `@gui-chat-plugin/switch-role` | Core (framework-agnostic) |
| `@gui-chat-plugin/switch-role/vue` | Vue implementation |
| `@gui-chat-plugin/switch-role/style.css` | Tailwind CSS styles |

## Test Prompts

1. "Switch to the coding assistant role"
2. "Change to the creative writer persona"
3. "What roles are available?"
4. "Switch role to listener"

## Development

```bash
yarn install
yarn dev        # Start dev server
yarn build      # Build
yarn typecheck  # Type check
yarn lint       # Lint
```

## License

MIT
