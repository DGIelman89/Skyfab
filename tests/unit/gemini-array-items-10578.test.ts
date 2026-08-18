// #10578: Gemini rejects array-typed tool parameters without `items`.
// cleanJSONSchemaForAntigravity must inject a fallback items schema.
import { test } from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);

test("array property without items gets items injected", () => {
  const schema = {
    type: "object",
    properties: {
      params: {
        type: "array",
        description: "list of parameters",
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Record<string, unknown>;
  const params = (cleaned.properties as Record<string, unknown>).params as Record<string, unknown>;

  assert.equal(params.type, "array");
  assert.ok(params.items, "array property must have items after cleaning");
  assert.deepEqual(params.items, { type: "string" });
});

test("array property with existing items is preserved", () => {
  const schema = {
    type: "object",
    properties: {
      tags: {
        type: "array",
        items: { type: "integer" },
        description: "list of tags",
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Record<string, unknown>;
  const tags = (cleaned.properties as Record<string, unknown>).tags as Record<string, unknown>;

  assert.deepEqual(tags.items, { type: "integer" }, "existing items must not be overwritten");
});

test("nested array without items gets items injected", () => {
  const schema = {
    type: "object",
    properties: {
      outer: {
        type: "object",
        properties: {
          inner_list: {
            type: "array",
          },
        },
      },
    },
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as Record<string, unknown>;
  const outer = (cleaned.properties as Record<string, unknown>).outer as Record<string, unknown>;
  const innerList = (outer.properties as Record<string, unknown>).inner_list as Record<string, unknown>;

  assert.ok(innerList.items, "nested array must have items after cleaning");
});
