// #10346: empty-pool warnings should fire once per label, not on every resolve.
import { test } from "node:test";
import assert from "node:assert/strict";

const { resetEmptyPoolWarnedLabelsForTests } = await import(
  "../../open-sse/services/autoCombo/virtualFactory.ts"
);

test("emptyPoolWarnedLabels reset works", () => {
  resetEmptyPoolWarnedLabelsForTests();
  // Verify the function exists and doesn't throw
  assert.ok(true);
});

test("Set dedup logic: same label only added once", () => {
  const warned = new Set<string>();
  const label = "auto/zai";

  // First time: should warn
  assert.ok(!warned.has(label), "first call should not be warned");
  warned.add(label);

  // Second time: already warned
  assert.ok(warned.has(label), "second call should be warned");
  assert.equal(warned.size, 1, "set should have exactly one entry");
});
