// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Array = require("Data.Array");
var Data_Either = require("Data.Either");
var Data_Foreign = require("Data.Foreign");
var Data_Foreign_Index = require("Data.Foreign.Index");
var Data_Foreign_Null = require("Data.Foreign.Null");
var Data_Foreign_NullOrUndefined = require("Data.Foreign.NullOrUndefined");
var Data_Foreign_Undefined = require("Data.Foreign.Undefined");
var Data_Int = require("Data.Int");
var Data_Traversable = require("Data.Traversable");
var IsForeign = function (read) {
    this.read = read;
};
var stringIsForeign = new IsForeign(Data_Foreign.readString);
var read = function (dict) {
    return dict.read;
};
var readJSON = function (dictIsForeign) {
    return function (json) {
        return Prelude[">>="](Data_Either.bindEither)(Data_Foreign.parseJSON(json))(read(dictIsForeign));
    };
};
var readWith = function (dictIsForeign) {
    return function (f) {
        return function (value) {
            return Data_Either.either(function ($8) {
                return Data_Either.Left.create(f($8));
            })(Data_Either.Right.create)(read(dictIsForeign)(value));
        };
    };
};
var readProp = function (dictIsForeign) {
    return function (dictIndex) {
        return function (prop) {
            return function (value) {
                return Prelude[">>="](Data_Either.bindEither)(Data_Foreign_Index["!"](dictIndex)(value)(prop))(readWith(dictIsForeign)(Data_Foreign_Index.errorAt(dictIndex)(prop)));
            };
        };
    };
};
var undefinedIsForeign = function (dictIsForeign) {
    return new IsForeign(Data_Foreign_Undefined.readUndefined(read(dictIsForeign)));
};
var numberIsForeign = new IsForeign(Data_Foreign.readNumber);
var nullOrUndefinedIsForeign = function (dictIsForeign) {
    return new IsForeign(Data_Foreign_NullOrUndefined.readNullOrUndefined(read(dictIsForeign)));
};
var nullIsForeign = function (dictIsForeign) {
    return new IsForeign(Data_Foreign_Null.readNull(read(dictIsForeign)));
};
var intIsForeign = new IsForeign(Data_Foreign.readInt);
var foreignIsForeign = new IsForeign(function (f) {
    return Prelude["return"](Data_Either.applicativeEither)(f);
});
var charIsForeign = new IsForeign(Data_Foreign.readChar);
var booleanIsForeign = new IsForeign(Data_Foreign.readBoolean);
var arrayIsForeign = function (dictIsForeign) {
    return new IsForeign(function (value) {
        var readElement = function (i) {
            return function (value1) {
                return readWith(dictIsForeign)(Data_Foreign.ErrorAtIndex.create(i))(value1);
            };
        };
        var readElements = function (arr) {
            return Data_Traversable.sequence(Data_Traversable.traversableArray)(Data_Either.applicativeEither)(Data_Array.zipWith(readElement)(Data_Array.range(0)(Data_Array.length(arr)))(arr));
        };
        return Prelude[">>="](Data_Either.bindEither)(Data_Foreign.readArray(value))(readElements);
    });
};
module.exports = {
    IsForeign: IsForeign, 
    readProp: readProp, 
    readWith: readWith, 
    readJSON: readJSON, 
    read: read, 
    foreignIsForeign: foreignIsForeign, 
    stringIsForeign: stringIsForeign, 
    charIsForeign: charIsForeign, 
    booleanIsForeign: booleanIsForeign, 
    numberIsForeign: numberIsForeign, 
    intIsForeign: intIsForeign, 
    arrayIsForeign: arrayIsForeign, 
    nullIsForeign: nullIsForeign, 
    undefinedIsForeign: undefinedIsForeign, 
    nullOrUndefinedIsForeign: nullOrUndefinedIsForeign
};
