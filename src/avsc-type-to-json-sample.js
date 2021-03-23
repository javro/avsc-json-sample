"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.typeToJsonSample = void 0;
var avsc_1 = require("avsc");
var RecordType = avsc_1.types.RecordType;
var StringType = avsc_1.types.StringType;
var IntType = avsc_1.types.IntType;
var LongType = avsc_1.types.LongType;
var FloatType = avsc_1.types.FloatType;
var DoubleType = avsc_1.types.DoubleType;
var BooleanType = avsc_1.types.BooleanType;
var NullType = avsc_1.types.NullType;
var BytesType = avsc_1.types.BytesType;
var UnwrappedUnionType = avsc_1.types.UnwrappedUnionType;
var ArrayType = avsc_1.types.ArrayType;
var WrappedUnionType = avsc_1.types.WrappedUnionType;
var EnumType = avsc_1.types.EnumType;
var FixedType = avsc_1.types.FixedType;
var MapType = avsc_1.types.MapType;
function typeToJsonSample(type) {
    if (type instanceof RecordType) {
        return type.fields
            .map(function (field) { return ({
            key: field.name,
            value: typeToJsonSample(field.type)
        }); })
            .reduce(function (allRecordInJson, _a) {
            var _b;
            var key = _a.key, value = _a.value;
            return __assign(__assign({}, allRecordInJson), (_b = {}, _b[key] = value, _b));
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
        var canExcludeNullInUnionToHaveAMoreDescriptiveSample = type.types[0] instanceof NullType && type.types[1];
        if (canExcludeNullInUnionToHaveAMoreDescriptiveSample) {
            return typeToJsonSample(type.types[1]);
        }
        return typeToJsonSample(type.types[0]);
    }
    if (type instanceof WrappedUnionType) {
        return type.types.reduce(function (allUnionSample, currentUnionType) {
            var _a;
            return __assign(__assign({}, allUnionSample), (_a = {}, _a[currentUnionType.branchName] = typeToJsonSample(currentUnionType), _a));
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
            key: typeToJsonSample(type.valuesType)
        };
    }
}
exports.typeToJsonSample = typeToJsonSample;
