module DemoApp.WithRactive where

import Prelude                   (Unit, bind, not, (++))
import Data.Maybe                (Maybe(Nothing, Just), fromMaybe)
import Control.Monad.Eff         (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Control.Monad.Eff.Ractive
import Control.Monad.Eff.Random  (RANDOM, random)

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
onLogoClicked :: forall event e. Ractive -> event -> Eff (ractiveM :: RactiveM, random :: RANDOM | e) Unit
onLogoClicked = \r e -> do
                         canRandomize <- (get "canRandomize" r)
                         if (fromMaybe false canRandomize) then (setRandom r) else (change "message" "Randomization disabled!" r)

-- | Callback for `control-button-clicked` proxy event
-- | Here we can enable/disable the randomization functionality of the app.
onControlButtonClicked :: forall event eff. Ractive -> event -> Eff (ractiveM :: RactiveM | eff) Unit
onControlButtonClicked = \r e -> do
                                  canRandomize <- (get "canRandomize" r)
                                  change "canRandomize" (inverse (fromMaybe false canRandomize)) r

-- | Writes log messages to the Console Output Panel in Browser
writeLog :: forall e. Ractive -> String -> String -> Eff (ractiveM :: RactiveM | e) Unit
writeLog ractive logName message = do
                                    current <- (get logName ractive)
                                    let newLog = ((fromMaybe "" current) ++ message)
                                    change logName newLog ractive

main :: forall eff.
                Eff (
                  ractiveM :: RactiveM,
                  console :: CONSOLE,
                  random :: RANDOM | eff
                  ) Unit
main = do
       -- | Here we define a single Ractive instance.
       -- | Every instance must be given a `template` and a DOM-element `el` to mount.
       -- | The template can be a simple string describing instance's HTML-structure or a separate
       -- | <script>-tag with a non-javascript type-attribute, for example "text/ractive".
       -- | In most cases there's also a `data`-field containing properties,
       -- | child-components, functions etc.

       -- | Define Component Properties
       let componentSettings = Data { template : "#component-template",
                                 "data" : {
                                   info : "I'm an embedded Ractive.JS component",
                                   logoUrl   : "./content/img/ractive-logo.png"
                                 }
                              }
       -- | Create a new Component based on Ractive as its `base class`
       let component = extend componentSettings
       -- | Define MainApp's Properties containing a Child Component
       let appSettings = Data {
                         template : "#template",
                         el       : "#app",
                         "data" : {
                                  uiLibrary : "RactiveJS",
                                  language  : "PureScript",
                                  logoUrl   : "./content/img/ps-logo.png",
                                  message   : "Click on the PureScript Logo!",
                                  consoleMessages: "no messages",
                                  canRandomize : true,
                                  counter: 0,
                                  numbers: []
                              },
                          components : {
                            "mycomponent" : component -- Child Component
                          }
                      }
       -- | Instantiate the MainApp Component
       -- | This component will load its template first and then all subordinated
       -- | components and their templates
       ract <- ractive appSettings
       -- | Here we 'move' our Ractive instance from DOMNode 'app' to 'dummy'
       domObj <- detach ract -- first, we `detach` the instance
       insert ract (Target "#dummy") Nothing -- and second, we `insert` it
       -- | We can also `reset` the `data` property of our Ractive instance
       -- reset Nothing Nothing ract
       -- | We can easily serve fully rendered pages with `toHTML`
       -- | a.k.a. isomorphic JS, or `rehydrating` of clients
       html <- toHTML ract
       log ("This is the whole HTML => " ++ (fromMaybe "" html))
       -- | We can update our models at any time
       -- updateModel Nothing Nothing (\ract -> log "Model updated!") ract
       -- | ---------------------------------
       -- Register event-handlers for logo-clicks & button-clicks.
       -- Generate a random number each time we click the logo.
       on "logo-clicked" (onLogoClicked ract) ract
       on "control-button-clicked" (onControlButtonClicked ract) ract
       -- | Push a value into Ractive (console only)
       -- | The Callbacks are not mandatory. Just pass a `Nothing`.
       -- | If a Callback is Nothing a `logic-less` callback will be used on JS-side
       push "numbers" 12345 (Just (\p -> writeLog ract "consoleMessages" "\r\n\r\npush completed")) ract
       -- | Get a value from Ractive and execute callback
       (pop "numbers" (Just (\result -> writeLog ract "consoleMessages" ("\r\n\r\ngot value: " ++ result))) ract)

       -- We can also deregister event handlers like in the example below
       -- See also: http://docs.ractivejs.org/latest/ractive-off
       --> off (Just "logo-clicked") Nothing ract

       -- Ractive supports observers via observe & observeOnce APIs
       --> See also: http://docs.ractivejs.org/latest/ractive-observe
       --> and: http://docs.ractivejs.org/latest/ractive-observeonce
       --> the Callback receives:
       --------------------------> n = new value
       --------------------------> o = old value
       --------------------------> kp = keypath
       (observe "message" (\n o kp -> writeLog ract "consoleMessages" ("\r\n\r\nrandom: " ++ n)) Nothing ract)
       -- | Observe `counter` property changes.
       (observe "counter" (\n o kp -> writeLog ract "consoleMessages" ("\r\n\r\ncounter: " ++ n)) Nothing ract)
       -- | returns the first DOM-Node matching the given CSS selector
       logo <- (find ".app-logo" ract)
       -- | returns an Array of DOM-Nodes matching the CSS selector
       --> See also: http://docs.ractivejs.org/latest/ractive-findall
       elems <- (findAll "div" Nothing ract)
       -- | Increment & decrement the counter.
       -- | The registered observer will display changes in the Console Panel.
       (add "counter" (Just 5.0) (Just \r -> log "Counter incremented!") ract)
       (subtract "counter" (Just 1.0) (Just \r -> log "Counter decremented!") ract)
       -- Change the internal state of Ractive instance
       -- Here we manipulate the property `message`
       --> change "message" "HELLO WORLD!" ract

       -- | animate API
       (animate "message" "Click on the PureScript Logo! :)" Nothing ract)

       -- | We can fire events with `fire`
       fire "logo-clicked" Nothing ract
       -- | ----------------------------

       -- Return a value from Ractive
       -- See also: http://docs.ractivejs.org/latest/ractive-get
       m <- (get "message" ract)
       log (fromMaybe "" m)