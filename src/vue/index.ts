/**
 * SwitchRole Plugin - Vue Implementation
 */

import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { SwitchRoleArgs, SwitchRoleJsonData } from "../core/types";
import { pluginCore } from "../core/plugin";
import Preview from "./Preview.vue";

export const plugin: ToolPlugin<unknown, SwitchRoleJsonData, SwitchRoleArgs> = {
  ...pluginCore,
  previewComponent: Preview,
  // No viewComponent - this plugin only has a preview
};

// Re-export types
export type { Role, SwitchRoleArgs, SwitchRoleJsonData } from "../core/types";

// Re-export utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  SYSTEM_PROMPT,
  createToolDefinition,
  executeSwitchRole,
  pluginCore,
} from "../core/plugin";

export { Preview };

// Default export for MulmoChat compatibility
export default { plugin };
