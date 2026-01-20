/**
 * SwitchRole Tool Definition (Schema)
 */

import type { ToolDefinition } from "gui-chat-protocol";
import type { Role } from "./types";

export const TOOL_NAME = "switchRole";

/**
 * Create tool definition with specific roles
 * @param roles - Array of available roles
 */
export function createToolDefinition(roles: Role[]): ToolDefinition {
  const roleIds = roles.map((r) => r.id);
  const roleOptionsDescription = roles
    .map((r) => `'${r.id}' (${r.name})`)
    .join(", ");

  return {
    type: "function",
    name: TOOL_NAME,
    description: `Switch the system prompt role and reconnect to the LLM. This changes the AI's personality and behavior. Available roles: ${roleOptionsDescription}.`,
    parameters: {
      type: "object",
      properties: {
        role: {
          type: "string",
          enum: roleIds,
          description: `The role to switch to. Options: ${roleOptionsDescription}`,
        },
      },
      required: ["role"],
    },
  };
}

/**
 * Default tool definition (used when roles are not provided)
 * Apps should use createToolDefinition() with their roles for better LLM guidance
 */
export const TOOL_DEFINITION: ToolDefinition = {
  type: "function",
  name: TOOL_NAME,
  description:
    "Switch the system prompt role and reconnect to the LLM. This changes the AI's personality and behavior.",
  parameters: {
    type: "object",
    properties: {
      role: {
        type: "string",
        description: "The role ID to switch to",
      },
    },
    required: ["role"],
  },
};

export const SYSTEM_PROMPT = `When users ask to change the role, personality, or behavior of the AI (e.g., 'switch to tutor role', 'change to listener role', 'be a teacher'), use the ${TOOL_NAME} function. Note that switching roles will disconnect and reconnect the conversation.`;
