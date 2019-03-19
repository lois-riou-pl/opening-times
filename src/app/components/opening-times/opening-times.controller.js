function OpeningTimesController(OpeningTimesService) {
  var ctrl = this;
  ctrl.openingTimes = OpeningTimesService.getOpeningTimes;
  ctrl.dayNames = OpeningTimesService.getDayNames;

  ctrl.openingTimesDataForm = {
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
    ctrl.openingTimesDataForm.days.push({ name: day, checked: false});
  });

  ctrl.submitOpeningTimesForm = function () {
    OpeningTimesService.updateOpeningTimes(ctrl.openingTimesDataForm);
  }
}

angular
  .module('components.opening-times')
  .constant("moment", moment)
  .controller('OpeningTimesController', OpeningTimesController);
