"use strict";
exports.__esModule = true;
exports.avscJsonSample = void 0;
var avsc_1 = require("avsc");
var avsc_type_to_json_sample_1 = require("./avsc-type-to-json-sample");
function avscJsonSample(avroSchema) {
    var avscType = avsc_1.Type.forSchema(avroSchema);
    return avsc_type_to_json_sample_1.typeToJsonSample(avscType);
}
exports.avscJsonSample = avscJsonSample;
