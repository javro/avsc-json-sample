import { Schema, Type } from "avsc";
import { typeToJsonSample } from "./avsc-type-to-json-sample";

export function avscJsonSample(avroSchema: Schema) {
  const avscType = Type.forSchema(avroSchema);
  return typeToJsonSample(avscType);
}
