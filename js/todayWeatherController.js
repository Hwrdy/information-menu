var TodayWeather = {};

(function(param){
  
  // elements of this template (todayWeather.html)
  var _elements = {
    form: $('.Search-form'),
    city: $('.city-input'),
    country: $('.country-input'),
    submitBtn: $('.submit-button'),
    busy: $('.busy'),
    errorSection: $('.Error'),
    errorMsg: $('.Error-message'),
    picture: $('.Result-picture'),
    resultTitle: $('.Result-title'),
    resultDescription: $('.Result-description'),
    resultTemperature: $('.temperature-text'),
    resultHumidity: $('.humidity-text'),
    resultTemperatureTitle: $('.temperature-title'),
    resultHumidityTitle: $('.humidity-title')
  };
  
  var _apiKey = 'fb9fcd5076de849c635711fd1cfda6d2';
  var _apiUrl ='http://api.openweathermap.org/data/2.5/weather';
  
  var _cleanResult = function() {
    _elements.picture.removeClass('u-cloud');
    _elements.picture.removeClass('u-clear');
    _elements.picture.removeClass('u-rain');
    _elements.picture.removeClass('u-other');
    _elements.resultTitle.text('');
    _elements.resultDescription.text('');
    _elements.resultTemperature.text('');
    _elements.resultHumidity.text('');
    _elements.resultTemperatureTitle.removeClass('u-show-inlineBlock');
    _elements.resultTemperatureTitle.addClass('u-hide');
    _elements.resultHumidityTitle.removeClass('u-show-inlineBlock');
    _elements.resultHumidityTitle.addClass('u-hide');
  }
  
  var _showWeather = function(data) {
    var tempMin = data.main.temp_min;
    var tempMax = data.main.temp_max;
    var humidity = data.main.humidity;
    var weatherMain = data.weather[0].main;
    var weatherDesc = data.weather[0].description;
    
    switch (weatherMain.toLowerCase()) {
      case 'clouds':
        _elements.picture.addClass('u-cloud');
        break;
      case 'clear':
        _elements.picture.addClass('u-clear');
        break;
      case 'rain':
        _elements.picture.addClass('u-rain');
        break;
      default:
        _elements.picture.addClass('u-other');
        break; 
    }
    
    _elements.resultTitle.text(weatherMain);
    _elements.resultDescription.text(weatherDesc);
    _elements.resultTemperature.text(tempMin + '°C ~ ' + tempMax + '°C');
    _elements.resultHumidity.text(humidity + '%');
    _elements.resultTemperatureTitle.addClass('u-show-inlineBlock');
    _elements.resultTemperatureTitle.removeClass('u-hide');
    _elements.resultHumidityTitle.addClass('u-show-inlineBlock');
    _elements.resultHumidityTitle.removeClass('u-hide');
  }
  
  var _showError = function(msg) {
    var handler = null;
    _elements.errorMsg.text(msg);
    _elements.errorSection.fadeIn();
    _elements.errorSection.bind("click", handler = function(){
      _elements.errorSection.unbind("click", handler);
      _elements.errorSection.fadeOut();  
    });
  };
  
  var _onRequestWeather = function() {
    _elements.busy.removeClass('u-hide');
    _elements.busy.addClass('u-show-inlineBlock');
    if(_elements.errorSection.css('display') !== 'none') {
      _elements.errorSection.click();
    }
    _cleanResult();
  };
  
  var _onReceiveWeather = function(res, city, country) {
    _elements.busy.addClass('u-hide');
    _elements.busy.removeClass('u-show-inlineBlock');
    
    if (res && res.weather && city && country) {
      if (res.name.toLowerCase() !== city) {
        _showError("Error: Not found city");
        return;
      }
      
      if (res.sys.country.toLowerCase() !== country) {
        _showError("Error: Not found country");
        return;
      }
      
      _showWeather(res, city, country);
      
    } else {
      if (res.message) {
        _showError(res.message);
      } else {
        _showError('Error: Request failed');
      }  
    }
  }
  
  var _getWeather = function() {
    var city = $.trim(_elements.city[0].value.toLowerCase());
    var country = $.trim(_elements.country[0].value.toLowerCase());
    var requestUrl = _apiUrl + '?q=' + city + ',' + country 
      + '&units=metric&appid=' + _apiKey; 
    
    _onRequestWeather();
    var request = $.ajax({
      method: 'GET',
      cache: false,
      dataType: 'jsonp',
      url: requestUrl
    });
    
    request.done(function(res){
      _onReceiveWeather(res, city, country);
    });
    request.fail(function(res){
      _onReceiveWeather();
    });
  };
  
  var _bind = function() {
    _elements.form.submit(function(event) {
      event.preventDefault();
      _getWeather();
    });
    
  };
  
  param.start = function() {
    _bind();
  }
 
})(TodayWeather);