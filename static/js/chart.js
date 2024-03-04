




var co2;
function isJSON(str) {
    try {
        return (JSON.parse(str) && !!str);
    } catch (e) {
        return false;
    }
}
//



var settingJson;
var JsonObj;
var x;
var y =100;

export function PH_data_chart(PH){
   y =PH;
}


Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  // Create the chart
  Highcharts.stockChart('container', {
    chart: {
      events: {
        load: function () {
  
          // set up the updating of the chart each second
          var series = this.series[0];
          console.log(100);
          setInterval(function () {
            x = (new Date()).getTime(), // current time
              // y =100;
              series.addPoint([x, y], true, true);
            
          }, 
          1000);
        }
      }
    },
  
    rangeSelector: {
      buttons: [{
        count: 1,
        type: 'minute',
        text: '1M'
      }, 
      {
        count: 5,
        type: 'minute',
        text: '5M'
      }, 
      
      {
        type: 'all',
        text: 'All'
      }
    ],
      inputEnabled: false,
      selected: 0
    },
  
    title: {
      text: 'Live data'
    },
  
    exporting: {
      enabled: false
    },
  
    series: [{
      name: 'PH data',
      data: (
        function () 
        {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          
          i;
        for (i = -99999; i <= 0; i += 1) {
          data.push([time + i * 1000, Math.round(1 * 100)]);
        
        }
        return (data);
        }
        ())
        }]
        });



  