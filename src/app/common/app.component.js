var app = {
  templateUrl: './app.html',
  controller: 'AppController'
};

angular
  .module('common')
  .component('app', app)
  .config(function($stateProvider) {
    $stateProvider.state('app', {
      redirectTo: 'opening-times',
      url: '/app',
      component: 'app'
    });
  });
