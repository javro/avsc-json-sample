import { Type, types } from "avsc";
import RecordType = types.RecordType;
import StringType = types.StringType;
import IntType = types.IntType;
import LongType = types.LongType;
import FloatType = types.FloatType;
import DoubleType = types.DoubleType;
import BooleanType = types.BooleanType;
import NullType = types.NullType;
import BytesType = types.BytesType;
import UnwrappedUnionType = types.UnwrappedUnionType;
import ArrayType = types.ArrayType;
import WrappedUnionType = types.WrappedUnionType;
import EnumType = types.EnumType;
import FixedType = types.FixedType;
import MapType = types.MapType;

export function typeToJsonSample(type: Type) {
  if (type instanceof RecordType) {
    return type.fields
      .map((field) => ({
        key: field.name,
        value: typeToJsonSample(field.type),
      }))
      .reduce((allRecordInJson, { key, value }) => {
        return {
          ...allRecordInJson,
          [key]: value,
        };
      }, {});
  }
  if (type instanceof StringType) {
    return "string";
  }
  if (type instanceof IntType || type instanceof LongType) {
    return 0;
  }
  if (type instanceof FloatType || type instanceof DoubleType) {
    return 0.1;
  }
  if (type instanceof BooleanType) {
    return true;
  }
  if (type instanceof NullType) {
    return null;
  }
  if (type instanceof BytesType) {
    return "\u00FF";
  }
  if (type instanceof UnwrappedUnionType) {
    const canExcludeNullInUnionToHaveAMoreDescriptiveSample =
      type.types[0] instanceof NullType && type.types[1];
    if (canExcludeNullInUnionToHaveAMoreDescriptiveSample) {
      return typeToJsonSample(type.types[1]);
    }
    return typeToJsonSample(type.types[0]);
  }
  if (type instanceof WrappedUnionType) {
    return type.types.reduce((allUnionSample, currentUnionType) => {
      if (!currentUnionType.branchName) {
        return allUnionSample;
      }
      return {
        ...allUnionSample,
        [currentUnionType.branchName]: typeToJsonSample(currentUnionType),
      };
    }, {});
  }
  if (type instanceof ArrayType) {
    return [typeToJsonSample(type.itemsType)];
  }
  if (type instanceof EnumType) {
    return type.symbols[0];
  }
  if (type instanceof FixedType) {
    return "".padStart(type.size, "a");
  }
  if (type instanceof MapType) {
    return {
      key: typeToJsonSample(type.valuesType),
    };
  }
}
