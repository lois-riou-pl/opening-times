function OpeningTimesController(OpeningTimesService) {
  var ctrl = this;
  ctrl.openingTimes = OpeningTimesService.getOpeningTimes;
  ctrl.dayNames = OpeningTimesService.getDayNames;
  ctrl.openingTimesDataForm = {};
  var openingTimesDataFormDefault = {
    'open': {
      'hours': 0,
      'minutes': 0
    },
    'close': {
      'hours': 0,
      'minutes': 0
    },
    'days': [
    ]
  }

  ctrl.dayNames.forEach(function (day) {
    openingTimesDataFormDefault.days.push({ name: day, checked: false});
  });

  ctrl.openingTimesDataForm = angular.copy(openingTimesDataFormDefault);

  ctrl.submitOpeningTimesForm = function () {
    OpeningTimesService.updateOpeningTimes(ctrl.openingTimesDataForm);
    ctrl.openingTimesDataForm = angular.copy(openingTimesDataFormDefault);
  }

  ctrl.deleteTime = function (index, type) {
    OpeningTimesService.resetTime(index, type)
  }

  ctrl.hasLeastOneDayChecked = ()=> {
    var result = ctrl.openingTimesDataForm.days.findIndex(x => x.checked === true);
    return result < 0;
  }

}

angular
  .module('components.opening-times')
  .constant("moment", moment)
  .controller('OpeningTimesController', OpeningTimesController)
  .filter('zeroForNumberSingleDigit', function () {
    return function (n) {
      if (n < 10) {
        return '0'+n
      } else {
        return n
      }
    };
  });



