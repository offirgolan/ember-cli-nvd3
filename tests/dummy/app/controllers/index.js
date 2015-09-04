import Ember from 'ember';
// import MultiBarChartData from '../models/multiBarChart';
import LineChartData from '../models/lineChart';

export default Ember.Controller.extend({
  datum: LineChartData,

  options: {
    chart: {
      height: 500,
      reduceXTicks: true,
      stacked: false,
      transitionDuration: 350,
      color: ['#428bca', '#00b875', '#fc9c12', '#e83878', '#5dc3bb']
    },
    yAxis: {
      tickFormat: d3.format(',s'),
      showMaxMin: false
    },
    tooltip: {
      gravity: 's',
      snapDistance: 10
    },
  },

  dispatchEvents: {
    chart: {
      stateChange(/*container, chart, e*/) {
        Ember.Logger.log('State Changed');
      }
    },
    multibar: {
      elementClick(container, chart, e) {
        alert(`${e.data.key}: (${e.data.x}, ${e.data.y})`);
      }
    },
    lines: {
      elementClick(container, chart, e) {
        alert(`${e.series.key}: (${e.point.x}, ${e.point.y})`);
      }
    }
  },


  beforeSetup(container /*, chart*/ ) {
    container.attr({
      height: 500
    });
  },

  afterSetup(container /*, chart*/ ) {
    container.selectAll('g.nv-axis.nv-x text')
      .filter(function() {
        return $(this).css('opacity') === "1";
      })
      .style("pointer-events", "visiblePainted")
      .style("cursor", "pointer")
      .on("click", function(x) {
        alert(`X-Axis: ${x}`);
      });
  }
});
