// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Control_Comonad = require("Control.Comonad");
var Control_Comonad_Trans = require("Control.Comonad.Trans");
var Control_Extend = require("Control.Extend");
var Data_Monoid = require("Data.Monoid");
var TracedT = function (x) {
    return x;
};
var runTracedT = function (v) {
    return v;
};
var functorTracedT = function (dictFunctor) {
    return new Prelude.Functor(function (f) {
        return function (v) {
            return Prelude["<$>"](dictFunctor)(function (g) {
                return function (t) {
                    return f(g(t));
                };
            })(v);
        };
    });
};
var extendTracedT = function (dictExtend) {
    return function (dictSemigroup) {
        return new Control_Extend.Extend(function () {
            return functorTracedT(dictExtend["__superclass_Prelude.Functor_0"]());
        }, function (f) {
            return function (v) {
                return Control_Extend["<<="](dictExtend)(function (w1) {
                    return function (t) {
                        return f(Prelude["<$>"](dictExtend["__superclass_Prelude.Functor_0"]())(function (h) {
                            return function (t__ALT) {
                                return h(Prelude["<>"](dictSemigroup)(t)(t__ALT));
                            };
                        })(w1));
                    };
                })(v);
            };
        });
    };
};
var comonadTransTracedT = function (dictMonoid) {
    return new Control_Comonad_Trans.ComonadTrans(function (dictComonad) {
        return function (v) {
            return Prelude["<$>"]((dictComonad["__superclass_Control.Extend.Extend_0"]())["__superclass_Prelude.Functor_0"]())(function (f) {
                return f(Data_Monoid.mempty(dictMonoid));
            })(v);
        };
    });
};
var comonadTracedT = function (dictComonad) {
    return function (dictMonoid) {
        return new Control_Comonad.Comonad(function () {
            return extendTracedT(dictComonad["__superclass_Control.Extend.Extend_0"]())(dictMonoid["__superclass_Prelude.Semigroup_0"]());
        }, function (v) {
            return Control_Comonad.extract(dictComonad)(v)(Data_Monoid.mempty(dictMonoid));
        });
    };
};
module.exports = {
    TracedT: TracedT,
    runTracedT: runTracedT,
    functorTracedT: functorTracedT,
    extendTracedT: extendTracedT,
    comonadTracedT: comonadTracedT,
    comonadTransTracedT: comonadTransTracedT
};