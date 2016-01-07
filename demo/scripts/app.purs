module DemoApp.WithRactive where

import Prelude                   (Unit, bind, not, (++),return,($),(>>=))
import Data.Maybe
import Control.Monad.Eff         (Eff)
import Control.Monad.Eff.Console (CONSOLE, log, print)
import Control.Monad.Eff.Ractive (RactiveM, Ractive, ractive, on, get, set, push, pop)
import Control.Monad.Eff.Random  (RANDOM, random)

newtype ContT r m a = ContT ((a -> m r) -> m r)

-- | Change a property by using Ractive's set() method
-- | The `RactiveM` type constructor is used to represent _RactiveJS_ effects.
-- |
-- | See [set-property from RactiveJS docs](http://docs.ractivejs.org/latest/ractive-set) for more details.
change :: forall value. String -> value -> Ractive -> (forall e. Eff (ractiveM :: RactiveM | e) Unit)
change property value ractive = do
                                  set property value ractive
-- | Inverse a Boolean value
inverse :: Boolean -> Boolean
inverse canRand = not canRand

-- | Change the random numeric value in Ractive's property "message"
-- | The `RactiveM` type constructor is used to represent _RactiveJS_ effects.
-- | The `RANDOM` type constructor is used to represent _RANDOM_ values generator effects.
setRandom :: forall e. Ractive -> Eff (random :: RANDOM, ractiveM :: RactiveM | e) Unit
setRandom ractive = do
            n <- random
            (change "message" n ractive)


-- | Callback for `logo-clicked` proxy event
-- | Each time we click a new random number will be generated unless we disable it by clicking on the button below
onLogoClicked :: forall event eff. Ractive -> event -> Eff (ractiveM :: RactiveM, random :: RANDOM | eff) Unit
onLogoClicked = \r e -> do
                         canRandomize <- get "canRandomize" r
                         if canRandomize then (setRandom r) else (change "message" "Randomization disabled!" r)

-- | Callback for `control-button-clicked` proxy event
-- | Here we can enable/disable the randomization functionality of the app.
onControlButtonClicked :: forall event eff. Ractive -> event -> Eff (ractiveM :: RactiveM | eff) Unit
onControlButtonClicked = \r e -> do
                                  canRandomize <- (get "canRandomize" r)
                                  change "canRandomize" (inverse canRandomize) r

main :: forall eff. Eff (ractiveM :: RactiveM, console :: CONSOLE, random :: RANDOM | eff) Unit
main = do
       ract <- ractive {
                      template : "#template",
                      el : "#app",
                      partials : {},
                      "data" : {
                              uiLibrary : "RactiveJS",
                              language  : "PureScript",
                              logoUrl   : "./content/img/ps-logo.png",
                              message   : "Click the PureScript Logo!",
                              canRandomize : true,
                              numbers: []
                          }
                      }
       -- alternative call (lines 46/49 in Control/Monad/Eff/Ractive.purs must be uncommented)
       {-  ract <- ractive "#template" "#app" {
                                    uiLibrary : "RactiveJS",
                                    language  : "PureScript",
                                    logoUrl   : "./content/img/ps-logo.png",
                                    message   : "Hello, world!"
                                 }-}

       -- Register event-handlers for logo-clicks & button-clicks.
       -- Generate a random number each time we click the logo.
       on "logo-clicked" (onLogoClicked) ract
       on "control-button-clicked" (onControlButtonClicked) ract
       -- | Push a value into Ractive (console only)
       -- | The Callbacks are not mandatory. Just pass a `Nothing`.
       -- | If a Callback is Nothing a `logic-less` callback will be used on JS-side
       push "numbers" 12345 (Just (\p -> log "push completed")) ract
       -- | Get a value from Ractive (console only)
       (pop "numbers" (Just (\r -> log ("got value: " ++ r))) ract)
       -- log x
       -- We can also deregister event handlers like in the example below
       -- See also: http://docs.ractivejs.org/latest/ractive-off
       --> off (Just "logo-clicked") Nothing ract

       -- Change the internal state of Ractive instance
       -- Here we manipulate the property `message`
       --> change "message" "HELLO WORLD!" ract

       -- Return a value from Ractive
       -- See also: http://docs.ractivejs.org/latest/ractive-get
       m <- (get "message" ract)
       log m
