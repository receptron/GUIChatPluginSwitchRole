/**
 * SwitchRole Plugin - Core (Framework-agnostic)
 */

// Export plugin-specific types
export type { Role, SwitchRoleArgs, SwitchRoleJsonData } from "./types";

// Export role configuration
export { DEFAULT_ROLES, setRoles, getRoles, getRoleById } from "./roles";

// Export plugin utilities
export {
  TOOL_NAME,
  TOOL_DEFINITION,
  SYSTEM_PROMPT,
  createToolDefinition,
  executeSwitchRole,
  pluginCore,
} from "./plugin";
