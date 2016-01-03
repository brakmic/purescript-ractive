// Generated by psc version 0.8.0.0
"use strict";
var Data_Maybe_Unsafe = require("Data.Maybe.Unsafe");
var Number_Format = require("Number.Format");
var Prelude = require("Prelude");
var toOctString = function ($0) {
    return Data_Maybe_Unsafe.fromJust(Number_Format.toString(8)($0));
};
var toHexString = function ($1) {
    return Data_Maybe_Unsafe.fromJust(Number_Format.toString(16)($1));
};
var toDecString = function ($2) {
    return Data_Maybe_Unsafe.fromJust(Number_Format.toString(10)($2));
};
var toBinString = function ($3) {
    return Data_Maybe_Unsafe.fromJust(Number_Format.toString(2)($3));
};
module.exports = {
    toOctString: toOctString, 
    toHexString: toHexString, 
    toDecString: toDecString, 
    toBinString: toBinString
};
