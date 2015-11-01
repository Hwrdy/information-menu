var DataAnalysis = {};

(function(param){
  
  // data for rendering chart
  var _chartData = {
    chart: {
      borderWidth: 1
    },
    title: {
      text: 'Birth in Taiwan',
      x: -20
    },
    subtitle: {
      text: 'Source: Ministry of the interiror',
      x: -20
    },
    xAxis: {
      categories: ['2007', '2008', '2009', '2010', '2011', '2012', '2013']
    },
    yAxis: {
      title: {
        text: 'People'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: [{
      name: 'Men',
      data: [106898, 103937, 99492, 87213, 101943, 118848, 103120]
    }, {
      name: 'Female',
      data: [97516, 94796,91818, 79673, 94684, 110633, 95993]
    }]
  };
  
  param.show = function(chartData) {
    if (chartData) {
      $('.Analysis-chart').highcharts(chartData);
    } else {
      $('.Analysis-chart').highcharts(_chartData);
    }
  }
  
})(DataAnalysis);