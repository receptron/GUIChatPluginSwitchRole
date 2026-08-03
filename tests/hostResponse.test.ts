/**
 * `context.app.getRoles` returns `unknown` since gui-chat-protocol 2.0.0, so
 * the plugin narrows it here instead of trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isRoleList } from "../src/core/hostResponse.js";

describe("isRoleList", () => {
  test("accepts a list of roles", () => {
    assert.equal(
      isRoleList([
        { id: "teacher", name: "Teacher" },
        { id: "coach", name: "Coach" },
      ]),
      true,
    );
  });

  test("accepts a host with no roles configured", () => {
    assert.equal(isRoleList([]), true);
  });

  test("rejects a role missing the name the prompt reads back", () => {
    assert.equal(isRoleList([{ id: "teacher" }]), false);
  });

  test("rejects a role whose id is not a string", () => {
    assert.equal(isRoleList([{ id: 1, name: "Teacher" }]), false);
  });

  test("rejects values that are not a list", () => {
    [null, undefined, "ok", 7, {}].forEach((value) => {
      assert.equal(
        isRoleList(value),
        false,
        `should reject ${JSON.stringify(value)}`,
      );
    });
  });
});
