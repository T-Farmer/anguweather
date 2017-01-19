angular
  .module('anguweather', ['ngRoute'])
  .config(($routeProvider) => {
    $routeProvider
    .when('/', {
        controller: 'RootCtrl',
        templateUrl: '/partials/root.html',
    })
    .when('/weather/:zipcode', {
        controller: 'WeatherCtrl',
        templateUrl: '/partials/weather.html',
    })
  })
  //DON'T USE ARROW FUNCTIONS FOR CONTROLLERS OR SERVICES
  .controller('RootCtrl', function($scope, $location) {
    console.log('I am a RootCtrl')
    $scope.gotoWeather = () =>
        //change the url
        $location.url(`/weather/${$scope.zip}`)
    })
  .controller('WeatherCtrl', function($scope, $routeParams, weatherFactory) {
    console.log('I am a WeatherCtrl')

    weatherFactory
        .getWeather($routeParams.zipcode)
        .then((weather) => {
           $scope.temperature = weather.temp
           $scope.city = weather.city
        })
  })
  .factory('weatherFactory', ($http) => {
    return {
        getWeather (zipcode) {
            return $http
            .get(`http://api.wunderground.com/api/8b878cbfab4936e7/conditions/q/${zipcode}.json`)
            .then((response) => ({ //same as `=> return {`
                temp: response.data.current_observation.temp_f,
                city: response.data.current_observation.display_location.full,
            })
            )
        },
    }
  })
