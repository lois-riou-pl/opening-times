function OpeningTimesService() {
  var openingTimes = [];
  var dayNames = moment.weekdays(true);

  function initOpeningTimes() {
    var order = 0;
    dayNames.forEach(function (day) {
      openingTimes.push({ name: day, order: order, start: { open : {hours: 0, minutes: 0}, close: {hours: 0, minutes: 0} }, end: { open : {hours: 0, minutes: 0}, close: {hours: 0, minutes: 0}}});
      order++
    })
  }
  initOpeningTimes();

  function setTimeByDay(dataForm) {

    for (var openingTime in openingTimes) {
      for (var dayForm in dataForm.days) {
        if (dataForm.days[dayForm].checked && dataForm.days[dayForm].name === openingTimes[openingTime].name) {
          var times = openingTimes[openingTime];
          var position = checkPosition(dataForm, times);
          if (position === 'start' || position === 'end') {
            times[position] = angular.copy(dataForm);
          } else if (position === 'pop') {
            times['start'] = angular.copy(times['end']);
            times['end'] = angular.copy(dataForm);
          } else if (position === 'push') {
            times['end'] = angular.copy(times['start']);
            times['start'] = angular.copy(dataForm);
          } else if (position === 'merge') {
            times['start'] = angular.copy(dataForm);
            times['end'].open.hours = 0;
            times['end'].open.minutes = 0;
            times['end'].close.hours = 0;
            times['end'].close.minutes = 0;
          }
        }
      }
    }

    return true;
  }

  function checkPosition(dataForm, times) {
    var result;
    if (!isFirstTime(times)) {
      if (dataForm.close.hours < times.end.open.hours || dataForm.close.hours == times.end.open.hours && dataForm.close.minutes <= times.end.open.hours) {
        result = 'start';
      } else if (dataForm.open.hours <= times.start.close.hours && dataForm.close.hours >= times.end.open.hours && dataForm.close.hours >= times.start.open.hours  ){
        result = 'merge'
      } else if (dataForm.open.hours >= times.start.open.hours  &&  times.start.open.hours && dataForm.open.hours > times.start.close.hours ||
        dataForm.open.hours >= times.start.open.hours && dataForm.close.hours == times.start.close.hours && dataForm.close.minutes <= times.start.close.minutes) {
        result = 'end';
      }  else if (dataForm.close.hours <= times.start.open.hours) {
        result = 'push';
      } else if (dataForm.open.hours > times.end.close.hours) {
        result = 'pop';
      }

    } else {
      result = 'start';
    }

    return result;
  }

  function isFirstTime(times){
    return !!(times.start.open.hours === 0 && times.start.open.minutes === 0 && times.start.close.hours === 0 && times.start.close.minutes === 0 && times.end.open.hours === 0 && times.end.open.minutes === 0 && times.end.close.hours === 0 && times.end.close.minutes === 0)
  }

  function updateOpeningTimes(dataFrom) {
     return setTimeByDay(dataFrom);
  }

  function resetTime(index, type){
    openingTimes[index][type].open.hours = 0;
    openingTimes[index][type].open.minutes = 0;
    openingTimes[index][type].close.hours = 0;
    openingTimes[index][type].close.hours = 0;
  }

  return {
    getOpeningTimes: openingTimes,
    getDayNames: dayNames,
    updateOpeningTimes: function (dataForm) {
      return updateOpeningTimes(dataForm);
    },
    resetTime: function (index, type) {
      return resetTime(index, type);
    }
  };
}

angular
  .module('components.opening-times')
  .factory('OpeningTimesService', OpeningTimesService);

// Todo: Move in config file
moment.locale('fr', {
  months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  monthsParseExact : true,
  weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  weekdaysParseExact : true,
  longDateFormat : {
    LT : 'HH:mm',
    LTS : 'HH:mm:ss',
    L : 'DD/MM/YYYY',
    LL : 'D MMMM YYYY',
    LLL : 'D MMMM YYYY HH:mm',
    LLLL : 'dddd D MMMM YYYY HH:mm'
  },
  calendar : {
    sameDay : '[Aujourd’hui à] LT',
    nextDay : '[Demain à] LT',
    nextWeek : 'dddd [à] LT',
    lastDay : '[Hier à] LT',
    lastWeek : 'dddd [dernier à] LT',
    sameElse : 'L'
  },
  relativeTime : {
    future : 'dans %s',
    past : 'il y a %s',
    s : 'quelques secondes',
    m : 'une minute',
    mm : '%d minutes',
    h : 'une heure',
    hh : '%d heures',
    d : 'un jour',
    dd : '%d jours',
    M : 'un mois',
    MM : '%d mois',
    y : 'un an',
    yy : '%d ans'
  },
  dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
  ordinal : function (number) {
    return number + (number === 1 ? 'er' : 'e');
  },
  meridiemParse : /PD|MD/,
  isPM : function (input) {
    return input.charAt(0) === 'M';
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem : function (hours, minutes, isLower) {
    return hours < 12 ? 'PD' : 'MD';
  },
  week : {
    dow : 1, // Monday is the first day of the week.
    doy : 4  // Used to determine first week of the year.
  }
});
