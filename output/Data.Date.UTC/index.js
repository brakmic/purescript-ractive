// Generated by psc version 0.8.0.0
"use strict";
var $foreign = require("./foreign");
var Data_Date = require("Data.Date");
var Data_Enum = require("Data.Enum");
var Data_Function = require("Data.Function");
var Data_Maybe = require("Data.Maybe");
var Data_Maybe_Unsafe = require("Data.Maybe.Unsafe");
var Data_Time = require("Data.Time");
var Prelude = require("Prelude");
var year = function (d) {
    return $foreign.dateMethod("getUTCFullYear", d);
};
var secondOfMinute = function (d) {
    return $foreign.dateMethod("getUTCSeconds", d);
};
var month = function (d) {
    return Data_Maybe_Unsafe.fromJust(Data_Enum.toEnum(Data_Date.enumMonth)($foreign.dateMethod("getUTCMonth", d)));
};
var minuteOfHour = function (d) {
    return $foreign.dateMethod("getUTCMinutes", d);
};
var millisecondOfSecond = function (d) {
    return $foreign.dateMethod("getUTCMilliseconds", d);
};
var hourOfDay = function (d) {
    return $foreign.dateMethod("getUTCHours", d);
};
var dayOfWeek = function (d) {
    return Data_Maybe_Unsafe.fromJust(Data_Enum.toEnum(Data_Date.enumDayOfWeek)($foreign.dateMethod("getUTCDay", d)));
};
var dayOfMonth = function (d) {
    return $foreign.dateMethod("getUTCDate", d);
};
var dateTime = function (y) {
    return function (mo) {
        return function (d) {
            return function (h) {
                return function (mi) {
                    return function (s) {
                        return function (ms) {
                            return Data_Date.fromJSDate($foreign.jsDateFromValues(y, Data_Enum.fromEnum(Data_Date.enumMonth)(mo), d, h, mi, s, ms));
                        };
                    };
                };
            };
        };
    };
};
var date = function (y) {
    return function (m) {
        return function (d) {
            return dateTime(y)(m)(d)(0)(0)(0)(0);
        };
    };
};
module.exports = {
    millisecondOfSecond: millisecondOfSecond, 
    secondOfMinute: secondOfMinute, 
    minuteOfHour: minuteOfHour, 
    hourOfDay: hourOfDay, 
    dayOfWeek: dayOfWeek, 
    dayOfMonth: dayOfMonth, 
    month: month, 
    year: year, 
    date: date, 
    dateTime: dateTime
};