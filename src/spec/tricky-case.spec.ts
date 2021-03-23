import { avscJsonSample } from "../index";

test("Avro with record nested types", () => {
  const result = avscJsonSample({
    namespace: "com.namespace",
    name: "root",
    type: "record",
    fields: [
      {
        name: "nested",
        type: {
          name: "RecordType",
          type: "record",
          fields: [
            {
              name: "nestedStringField",
              type: "string",
            },
          ],
        },
      },
    ],
  });

  expect(result).toEqual({
    nested: {
      nestedStringField: "string",
    },
  });
});

test("Avro with array at root (WrappedEnum)", () => {
  const result = avscJsonSample([
    {
      namespace: "com.namespace",
      name: "Root",
      type: "record",
      fields: [
        {
          name: "field1",
          type: "string",
        },
      ],
    },
    {
      namespace: "com.namespace",
      name: "Other",
      type: "record",
      fields: [
        {
          name: "field2",
          type: "string",
        },
      ],
    },
  ]);

  expect(result).toEqual({
    "com.namespace.Root": {
      field1: "string",
    },
    "com.namespace.Other": {
      field2: "string",
    },
  });
});

test("Avro with referencing type", () => {
  const result = avscJsonSample({
    namespace: "com.namespace",
    name: "Root",
    type: "record",
    fields: [
      {
        name: "field1",
        type: {
          name: "FieldType",
          type: "record",
          fields: [
            {
              name: "nested",
              type: "string",
            },
          ],
        },
      },
      {
        name: "field2",
        type: "com.namespace.FieldType",
      },
    ],
  });

  expect(result).toEqual({
    field1: { nested: "string" },
    field2: { nested: "string" },
  });
});

test("Avro with logical types", () => {
  const result = avscJsonSample({
    type: "record",
    name: "Test",
    fields: [
      {
        name: "amount",
        type: {
          type: "bytes",
          logicalType: "decimal",
          precision: 15,
          scale: 5,
        },
        doc: "The amount",
      },
    ],
  });
  expect(result).toEqual({
    amount: "\u00FF",
  });
});
