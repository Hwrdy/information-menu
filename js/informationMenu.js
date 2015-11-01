// this is the menu class for this exercise
function InformationMenu() {
    
  // elements of the page (index.html)
  var _elements = {
    head: $('head'),
    content: $('#content'),
    analysis: $('.menu-analysis'),
    weather: $('.menu-weather')
  };
  
  // content package for data analysis
  var _contentAnalysis = {
    tplPath: 'template/dataAnalysis.html',
    css: $("<link rel='stylesheet' type='text/css' href='css/dataAnalysisStyle.css'>"),
    js: $("<script type='text/javascript' src='js/dataAnalysisController.js'>")
  };
  
  // content package for today wheather 
  var _contentWheather = {
    tplPath: 'template/todayWeather.html',
    css: $("<link rel='stylesheet' type='text/css' href='css/todayWeatherStyle.css'>"),
    js: $("<script type='text/javascript' src='js/todayWeatherController.js'>")
  };
  
  // clean previous selection
  var _cleanContent = function() {
    _elements.content.empty();
    _contentAnalysis.js.remove();
    _contentAnalysis.css.remove();
    _contentWheather.js.remove();
    _contentWheather.css.remove();
  }
  
  // event handler for data analysis clicked
  var _onAnalysisClick = function() {
    _cleanContent();
    _elements.weather.removeClass('is-selected');
    _elements.analysis.addClass('is-selected');
    _elements.content.load(_contentAnalysis.tplPath, function() {
      _elements.head.append(_contentAnalysis.css);
      _elements.head.append(_contentAnalysis.js);
      if (DataAnalysis.show) {
        DataAnalysis.show();
      }
    });
  };
  
  // event handler for today weather clicked
  var _onWeatherClick = function() {
    _cleanContent();
    _elements.analysis.removeClass('is-selected');
    _elements.weather.addClass('is-selected');
    _elements.content.load(_contentWheather.tplPath, function() {
      _elements.head.append(_contentWheather.css);
      _elements.head.append(_contentWheather.js);
      if (TodayWeather.start) {
        TodayWeather.start();
      }
    });
  };
  
  // binding fuctions
  var _bind = function() {
    _elements.analysis.bind('click', _onAnalysisClick);
    _elements.weather.bind('click', _onWeatherClick);
  }
  
  
  // public method for run menu
  this.start = function() {
    // Check jQuery loaded or not
    if(!window.jQuery) {
      return;
    }
   
    _bind();
  };
}