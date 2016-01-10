// Generated by psc version 0.8.0.0
"use strict";
var Optic_Types = require("Optic.Types");
var Prelude = require("Prelude");
var $qmark$qmark = function (dictFunctor) {
    return function (ff) {
        return function (x) {
            return Prelude["<$>"](dictFunctor)(function (f) {
                return f(x);
            })(ff);
        };
    };
};
var lens = function (s2a) {
    return function (s2b2t) {
        return function (dictFunctor) {
            return function (a2fb) {
                return function (s) {
                    return Prelude["<$>"](dictFunctor)(s2b2t(s))(a2fb(s2a(s)));
                };
            };
        };
    };
};
module.exports = {
    lens: lens, 
    "??": $qmark$qmark
};