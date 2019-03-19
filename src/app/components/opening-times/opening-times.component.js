var openingTimes = {
  templateUrl: "./opening-times.html",
  controller: "OpeningTimesController"
};

angular
  .module("components.opening-times")
  .component("openingTimes", openingTimes)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("opening-times", {
      url: "/opening-times",
      component: "openingTimes"
    });

    $urlRouterProvider.otherwise("/opening-times");
  });
