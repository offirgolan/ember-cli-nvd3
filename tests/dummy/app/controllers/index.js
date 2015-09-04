import Ember from 'ember';
// import MultiBarChartData from '../models/multiBarChart';
import LineChartData from '../models/lineChart';

export default Ember.Controller.extend({
  datum: LineChartData,

  options: {
    chart: {
      height: 500,
      groupSpacing: 0.1,
      reduceXTicks: true,
      stacked: false,
      transitionDuration: 350,
      color: ['#428bca', '#00b875', '#fc9c12', '#e83878', '#5dc3bb']
    },
    axes: {
      yAxis: {
        tickFormat: d3.format(',s'),
        showMaxMin: false
      }
    },
    tooltip: {
      gravity: 's',
      snapDistance: 10
    },
  },

  dispatchEvents: {
    multibar: {
      elementClick(e) {
        alert(`${e.data.key}: (${e.data.x}, ${e.data.y})`);
      }
    },
    lines: {
      elementClick(e) {
        alert(`${e.series.key}: (${e.point.x}, ${e.point.y})`);
      }
    }
  },


  beforeSetup(svgContainer /*, chart*/ ) {
    svgContainer.attr({
      height: 500
    });
  },

  afterSetup(svgContainer /*, chart*/ ) {
    svgContainer.selectAll('g.nv-axis.nv-x text')
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
