// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Either = require("Data.Either");
var Data_Profunctor = require("Data.Profunctor");
var Choice = function (__superclass_Data$dotProfunctor$dotProfunctor_0, left, right) {
    this["__superclass_Data.Profunctor.Profunctor_0"] = __superclass_Data$dotProfunctor$dotProfunctor_0;
    this.left = left;
    this.right = right;
};
var right = function (dict) {
    return dict.right;
};
var left = function (dict) {
    return dict.left;
};
var $plus$plus$plus = function (dictCategory) {
    return function (dictChoice) {
        return function (l) {
            return function (r) {
                return Prelude[">>>"](dictCategory["__superclass_Prelude.Semigroupoid_0"]())(left(dictChoice)(l))(right(dictChoice)(r));
            };
        };
    };
};
var $bar$bar$bar = function (dictCategory) {
    return function (dictChoice) {
        return function (l) {
            return function (r) {
                var join = Data_Profunctor.dimap(dictChoice["__superclass_Data.Profunctor.Profunctor_0"]())(Data_Either.either(Prelude.id(Prelude.categoryFn))(Prelude.id(Prelude.categoryFn)))(Prelude.id(Prelude.categoryFn))(Prelude.id(dictCategory));
                return Prelude[">>>"](dictCategory["__superclass_Prelude.Semigroupoid_0"]())($plus$plus$plus(dictCategory)(dictChoice)(l)(r))(join);
            };
        };
    };
};
var choiceFn = new Choice(function () {
    return Data_Profunctor.profunctorFn;
}, function (a2b) {
    return function (v) {
        if (v instanceof Data_Either.Left) {
            return Data_Either.Left.create(a2b(v.value0));
        };
        if (v instanceof Data_Either.Right) {
            return new Data_Either.Right(v.value0);
        };
        throw new Error("Failed pattern match at Data.Profunctor.Choice line 17, column 1 - line 22, column 1: " + [ a2b.constructor.name, v.constructor.name ]);
    };
}, Prelude["<$>"](Data_Either.functorEither));
module.exports = {
    Choice: Choice, 
    "|||": $bar$bar$bar, 
    "+++": $plus$plus$plus, 
    right: right, 
    left: left, 
    choiceFn: choiceFn
};