




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


// export function TEMP_data_chart(TEMP){
//   y =TEMP;
// }



Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  // Create the chart
  Highcharts.stockChart('container_3', {
    chart: {
      events: {
        load: function () {
  
          // set up the updating of the chart each second
          var series = this.series[0];
          console.log(100);
          setInterval(function () {
            var x = (new Date()).getTime(), // current time
              y =100;
              series.addPoint([x, y], true, true);
              console.log("for_loop");
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
        type: 'all_2',
        text: 'All_2'
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
      name: 'Tempareture data',
      data: (
        function () 
        {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          
          i;
        for (i = -99999; i <= 0; i += 1) {
          data.push([time + i * 1000, Math.round(1 * 100)]);
          console.log("for_loop");
        }
        return (data);
        }
        ())
        }]
        });



  