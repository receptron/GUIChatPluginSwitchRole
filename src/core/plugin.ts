/**
 * SwitchRole Plugin Core (Framework-agnostic)
 */

import type { ToolPluginCore, ToolContext, ToolResult } from "gui-chat-protocol";
import type { Role, SwitchRoleArgs, SwitchRoleJsonData } from "./types";
import { TOOL_DEFINITION, SYSTEM_PROMPT } from "./definition";

// Re-export for convenience
export { TOOL_NAME, TOOL_DEFINITION, SYSTEM_PROMPT, createToolDefinition } from "./definition";

/**
 * Extended ToolContext with role-related app functions
 */
interface SwitchRoleToolContext extends ToolContext {
  app?: ToolContext["app"] & {
    getRoles?: () => Role[];
    switchRole?: (roleId: string) => void;
  };
}

/**
 * Get roles from context.app (provided by the host app)
 */
function getRolesFromContext(context: SwitchRoleToolContext): Role[] {
  if (typeof context.app?.getRoles === "function") {
    return context.app.getRoles();
  }
  console.warn(
    "switchRole: context.app.getRoles() not available, returning empty roles",
  );
  return [];
}

/**
 * Get role by ID from context
 */
function getRoleByIdFromContext(
  context: SwitchRoleToolContext,
  id: string,
): Role | undefined {
  const roles = getRolesFromContext(context);
  return roles.find((role) => role.id === id);
}

/**
 * Execute the switchRole function
 * Triggers a role switch via the app layer
 */
export const executeSwitchRole = async (
  context: SwitchRoleToolContext,
  args: SwitchRoleArgs,
): Promise<ToolResult<unknown, SwitchRoleJsonData>> => {
  const { role } = args;
  const roles = getRolesFromContext(context);
  const availableRolesSummary = roles.map((r) => `${r.id} (${r.name})`).join(", ");

  try {
    // Validate role
    const validRole = getRoleByIdFromContext(context, role);
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

    // Call switchRole via context.app (provided by the host app)
    if (typeof context.app?.switchRole === "function") {
      // Fire and forget - this will disconnect and reconnect
      setTimeout(() => {
        context.app?.switchRole?.(role);
      }, 0);
    } else {
      console.error("switchRole: context.app.switchRole() not available");
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
