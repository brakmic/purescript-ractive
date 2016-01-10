// Generated by psc version 0.8.0.0
"use strict";
var Data_Either = require("Data.Either");
var Data_Identity = require("Data.Identity");
var Data_Maybe = require("Data.Maybe");
var Data_Profunctor = require("Data.Profunctor");
var Data_Profunctor_Choice = require("Data.Profunctor.Choice");
var Optic_Internal_Prism = require("Optic.Internal.Prism");
var Optic_Types = require("Optic.Types");
var Prelude = require("Prelude");
var withPrism = function (stab) {
    return function (f) {
        var $13 = stab(new Optic_Internal_Prism.Market(Data_Identity.Identity, Data_Either.Right.create));
        return f(function ($18) {
            return Data_Identity.runIdentity($13.value0($18));
        })(Prelude[">>>"](Prelude.semigroupoidFn)($13.value1)(Data_Either.either(Prelude[">>>"](Prelude.semigroupoidFn)(Data_Identity.runIdentity)(Data_Either.Left.create))(Data_Either.Right.create)));
    };
};
var prism = function (dictApplicative) {
    return function (dictChoice) {
        return function (b2t) {
            return function (s2Eta) {
                return function (pafb) {
                    return Data_Profunctor.dimap(dictChoice["__superclass_Data.Profunctor.Profunctor_0"]())(s2Eta)(Data_Either.either(Prelude.pure(dictApplicative))(Prelude["<$>"]((dictApplicative["__superclass_Prelude.Apply_0"]())["__superclass_Prelude.Functor_0"]())(b2t)))(Data_Profunctor_Choice.right(dictChoice)(pafb));
                };
            };
        };
    };
};
var prism$prime = function (b2s) {
    return function (s2Ma) {
        return function (dictApplicative) {
            return function (dictChoice) {
                return prism(dictApplicative)(dictChoice)(b2s)(function (s) {
                    return Data_Maybe.maybe(new Data_Either.Left(s))(Data_Either.Right.create)(s2Ma(s));
                });
            };
        };
    };
};
var nearly = function (x) {
    return function (p) {
        return function (dictApplicative) {
            return function (dictChoice) {
                var guard = function (v) {
                    if (v) {
                        return new Data_Maybe.Just(Prelude.unit);
                    };
                    if (!v) {
                        return Data_Maybe.Nothing.value;
                    };
                    throw new Error("Failed pattern match at Optic.Prism line 43, column 7 - line 44, column 7: " + [ v.constructor.name ]);
                };
                return prism$prime(Prelude["const"](x))(function ($19) {
                    return guard(p($19));
                })(dictApplicative)(dictChoice);
            };
        };
    };
};
var only = function (dictEq) {
    return function (x) {
        return function (dictApplicative) {
            return function (dictChoice) {
                return nearly(x)(Prelude["=="](dictEq)(x))(dictApplicative)(dictChoice);
            };
        };
    };
};
var matching = function (stab) {
    return withPrism(stab)(function (v) {
        return function (s) {
            return s;
        };
    });
};
var is = function (stab) {
    return function (s) {
        return Data_Either.either(Prelude["const"](false))(Prelude["const"](true))(matching(stab)(s));
    };
};
var isn$primet = function (stab) {
    return function (s) {
        return !is(stab)(s);
    };
};
var clonePrism = function (dictApplicative) {
    return function (dictChoice) {
        return function (stab) {
            return withPrism(stab)(prism(dictApplicative)(dictChoice));
        };
    };
};
module.exports = {
    withPrism: withPrism, 
    "prism'": prism$prime, 
    prism: prism, 
    only: only, 
    nearly: nearly, 
    matching: matching, 
    "isn't": isn$primet, 
    is: is, 
    clonePrism: clonePrism
};