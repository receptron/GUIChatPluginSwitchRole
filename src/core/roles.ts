/**
 * Default roles configuration
 * These can be overridden by the app layer
 */

import type { Role } from "./types";

export const DEFAULT_ROLES: Role[] = [
  { id: "general", name: "General" },
  { id: "tutor", name: "Tutor" },
  { id: "listener", name: "Listener" },
  { id: "receptionist", name: "Receptionist" },
  { id: "tourPlanner", name: "Trip Planner" },
  { id: "recipeGuide", name: "Recipe Guide" },
  { id: "game", name: "Game" },
  { id: "office", name: "Office" },
];

// Allow roles to be configured at runtime
let configuredRoles: Role[] = DEFAULT_ROLES;

export function setRoles(roles: Role[]): void {
  configuredRoles = roles;
}

export function getRoles(): Role[] {
  return configuredRoles;
}

export function getRoleById(id: string): Role | undefined {
  return configuredRoles.find((role) => role.id === id);
}
