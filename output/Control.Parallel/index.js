// Generated by psc version 0.8.0.0
"use strict";
var Prelude = require("Prelude");
var Data_Maybe = require("Data.Maybe");
var Control_Alt = require("Control.Alt");
var Control_Alternative = require("Control.Alternative");
var Control_Plus = require("Control.Plus");
var Control_Monad_Eff = require("Control.Monad.Eff");
var Control_Monad_Eff_Ref = require("Control.Monad.Eff.Ref");
var Control_Monad_Eff_Unsafe = require("Control.Monad.Eff.Unsafe");
var Control_Monad_Cont_Trans = require("Control.Monad.Cont.Trans");
var Parallel = function (x) {
    return x;
};
var runParallel = function (v) {
    return v;
};
var runParallelWith = function (k) {
    return function (p) {
        return Control_Monad_Cont_Trans.runContT(runParallel(p))(k);
    };
};
var refs = Control_Monad_Eff_Unsafe.unsafeInterleaveEff;
var race = function (c1) {
    return function (c2) {
        return Control_Monad_Cont_Trans.ContT(function (k) {
            return function __do() {
                var v = refs(Control_Monad_Eff_Ref.newRef(false))();
                Control_Monad_Cont_Trans.runContT(c1)(function (a) {
                    return function __do() {
                        var v1 = refs(Control_Monad_Eff_Ref.readRef(v))();
                        return (function () {
                            if (v1) {
                                return Prelude["return"](Control_Monad_Eff.applicativeEff)(Prelude.unit);
                            };
                            if (!v1) {
                                return function __do() {
                                    refs(Control_Monad_Eff_Ref.writeRef(v)(true))();
                                    return k(a)();
                                };
                            };
                            throw new Error("Failed pattern match at Control.Parallel line 49, column 1 - line 50, column 1: " + [ v1.constructor.name ]);
                        })()();
                    };
                })();
                return Control_Monad_Cont_Trans.runContT(c2)(function (a) {
                    return function __do() {
                        var v1 = refs(Control_Monad_Eff_Ref.readRef(v))();
                        return (function () {
                            if (v1) {
                                return Prelude["return"](Control_Monad_Eff.applicativeEff)(Prelude.unit);
                            };
                            if (!v1) {
                                return function __do() {
                                    refs(Control_Monad_Eff_Ref.writeRef(v)(true))();
                                    return k(a)();
                                };
                            };
                            throw new Error("Failed pattern match at Control.Parallel line 49, column 1 - line 50, column 1: " + [ v1.constructor.name ]);
                        })()();
                    };
                })();
            };
        });
    };
};
var par = function (f) {
    return function (ca) {
        return function (cb) {
            return Control_Monad_Cont_Trans.ContT(function (k) {
                return function __do() {
                    var v = refs(Control_Monad_Eff_Ref.newRef(Data_Maybe.Nothing.value))();
                    var v1 = refs(Control_Monad_Eff_Ref.newRef(Data_Maybe.Nothing.value))();
                    Control_Monad_Cont_Trans.runContT(ca)(function (a) {
                        return function __do() {
                            var v2 = refs(Control_Monad_Eff_Ref.readRef(v1))();
                            return (function () {
                                if (v2 instanceof Data_Maybe.Nothing) {
                                    return refs(Control_Monad_Eff_Ref.writeRef(v)(new Data_Maybe.Just(a)));
                                };
                                if (v2 instanceof Data_Maybe.Just) {
                                    return k(f(a)(v2.value0));
                                };
                                throw new Error("Failed pattern match at Control.Parallel line 30, column 1 - line 31, column 1: " + [ v2.constructor.name ]);
                            })()();
                        };
                    })();
                    return Control_Monad_Cont_Trans.runContT(cb)(function (b) {
                        return function __do() {
                            var v2 = refs(Control_Monad_Eff_Ref.readRef(v))();
                            return (function () {
                                if (v2 instanceof Data_Maybe.Nothing) {
                                    return refs(Control_Monad_Eff_Ref.writeRef(v1)(new Data_Maybe.Just(b)));
                                };
                                if (v2 instanceof Data_Maybe.Just) {
                                    return k(f(v2.value0)(b));
                                };
                                throw new Error("Failed pattern match at Control.Parallel line 30, column 1 - line 31, column 1: " + [ v2.constructor.name ]);
                            })()();
                        };
                    })();
                };
            });
        };
    };
};
var inParallel = Parallel;
var withCallback = function ($35) {
    return inParallel(Control_Monad_Cont_Trans.ContT($35));
};
var functorParallel = new Prelude.Functor(function (f) {
    return function (v) {
        return Prelude["<$>"](Control_Monad_Cont_Trans.functorContT(Control_Monad_Eff.monadEff))(f)(v);
    };
});
var applyParallel = new Prelude.Apply(function () {
    return functorParallel;
}, function (v) {
    return function (v1) {
        return par(Prelude["$"])(v)(v1);
    };
});
var applicativeParallel = new Prelude.Applicative(function () {
    return applyParallel;
}, function (a) {
    return Parallel(Prelude.pure(Control_Monad_Cont_Trans.applicativeContT(Control_Monad_Eff.monadEff))(a));
});
var altParallel = new Control_Alt.Alt(function () {
    return functorParallel;
}, function (v) {
    return function (v1) {
        return race(v)(v1);
    };
});
var plusParallel = new Control_Plus.Plus(function () {
    return altParallel;
}, Parallel(Control_Monad_Cont_Trans.ContT(function (v) {
    return Prelude["return"](Control_Monad_Eff.applicativeEff)(Prelude.unit);
})));
var alternativeParallel = new Control_Alternative.Alternative(function () {
    return plusParallel;
}, function () {
    return applicativeParallel;
});
module.exports = {
    race: race, 
    par: par, 
    withCallback: withCallback, 
    runParallelWith: runParallelWith, 
    runParallel: runParallel, 
    inParallel: inParallel, 
    functorParallel: functorParallel, 
    applyParallel: applyParallel, 
    applicativeParallel: applicativeParallel, 
    altParallel: altParallel, 
    plusParallel: plusParallel, 
    alternativeParallel: alternativeParallel
};