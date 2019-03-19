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
          openingTimes[openingTime].start.open.hours = dataForm.open.hours;
          openingTimes[openingTime].start.open.minutes = dataForm.open.minutes;
          openingTimes[openingTime].start.close.hours = dataForm.close.hours;
          openingTimes[openingTime].start.close.minutes = dataForm.close.minutes;
        }
      }
    }
  }

  function updateOpeningTimes(dataFrom) {
    setTimeByDay(dataFrom);
  }

  return {
    getOpeningTimes: openingTimes,
    getDayNames: dayNames,
    updateOpeningTimes: function (dataForm) {
      return updateOpeningTimes(dataForm)
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
