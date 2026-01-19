/**
 * SwitchRole Plugin Core (Framework-agnostic)
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { SwitchRoleArgs, SwitchRoleJsonData } from "./types";
import { TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";
import { getRoles, getRoleById } from "./roles";

// Re-export for convenience
export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT, createToolDefinition } from "./definition";
export { DEFAULT_ROLES, setRoles, getRoles, getRoleById } from "./roles";

/**
 * Execute the switchRole function
 * Triggers a role switch via the app layer
 */
export const executeSwitchRole = async (
  _context: ToolContext,
  args: SwitchRoleArgs,
): Promise<ToolResult<unknown, SwitchRoleJsonData>> => {
  const { role } = args;
  const roles = getRoles();
  const availableRolesSummary = roles.map((r) => `${r.id} (${r.name})`).join(", ");

  try {
    // Validate role
    const validRole = getRoleById(role);
    if (!validRole) {
      return {
        message: `Invalid role: ${role}`,
        jsonData: {
          success: false,
          error: "Invalid role",
          availableRoles: roles,
        },
        instructions: `Tell the user that '${role}' is not a valid role. Available roles are: ${availableRolesSummary}.`,
      };
    }

    // Call switchRole asynchronously (don't await)
    const globalObject = globalThis as typeof globalThis & {
      switchRole?: (selectedRole: string) => void;
    };

    if (
      typeof window !== "undefined" &&
      typeof globalObject.switchRole === "function"
    ) {
      // Fire and forget - this will disconnect and reconnect
      setTimeout(() => {
        globalObject.switchRole?.(role);
      }, 0);
    } else {
      console.error("switchRole function not found on window object");
      return {
        message: "Failed to switch role: switchRole API not available",
        jsonData: {
          success: false,
          error: "switchRole API not available",
        },
        instructions:
          "Tell the user that the role switching feature is not available.",
      };
    }

    // Immediately return to LLM
    return {
      message: `Role switch to '${validRole.name}' initiated`,
      jsonData: {
        success: true,
        role,
        roleName: validRole.name,
      },
    };
  } catch (error) {
    console.error("ERR: exception in switchRole", error);
    return {
      message: `Role switch error: ${error instanceof Error ? error.message : "Unknown error"}`,
      jsonData: {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      instructions:
        "Acknowledge that there was an error switching roles and ask the user to try again.",
    };
  }
};

// Core Plugin (without UI components)
export const pluginCore: ToolPluginCore<unknown, SwitchRoleJsonData, SwitchRoleArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: executeSwitchRole,
  generatingMessage: "Switching role...",
  isEnabled: () => true,
  systemPrompt: SYSTEM_PROMPT,
};
