/**
 * SwitchRole Plugin Types
 */

/** Role definition */
export interface Role {
  id: string;
  name: string;
}

/** Arguments passed to the switchRole tool */
export interface SwitchRoleArgs {
  role: string;
}

/** JSON data returned in result.jsonData (sent to LLM) */
export interface SwitchRoleJsonData {
  success: boolean;
  role?: string;
  roleName?: string;
  error?: string;
  availableRoles?: Role[];
}
