import type { Role } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isRole = (value: unknown): value is Role =>
  isRecord(value) &&
  typeof value["id"] === "string" &&
  typeof value["name"] === "string";

export const isRoleList = (value: unknown): value is Role[] =>
  Array.isArray(value) && value.every(isRole);
