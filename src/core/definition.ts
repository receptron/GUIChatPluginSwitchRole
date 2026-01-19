/**
 * SwitchRole Tool Definition (Schema)
 */

import type { ToolDefinition } from "gui-chat-protocol";
import { getRoles } from "./roles";

export const TOOL_NAME = "switchRole";

/**
 * Create tool definition with current roles
 * This needs to be called dynamically since roles can be configured
 */
export function createToolDefinition(): ToolDefinition {
  const roles = getRoles();
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

// Default tool definition using default roles
export const TOOL_DEFINITION: ToolDefinition = createToolDefinition();

export const SYSTEM_PROMPT = `When users ask to change the role, personality, or behavior of the AI (e.g., 'switch to tutor role', 'change to listener role', 'be a teacher'), use the ${TOOL_NAME} function. Note that switching roles will disconnect and reconnect the conversation.`;
