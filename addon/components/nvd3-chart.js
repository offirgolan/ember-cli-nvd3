import Ember from 'ember';

const {
  computed,
  observer,
  isNone,
  on
} = Ember;

export default Ember.Component.extend({
  classNames: ['nvd3-chart'],
  type: "lineChart",
  datum: [],
  options: {},
  dispatchEvents: {},

  // Actions
  beforeSetup: Ember.K,
  afterSetup: Ember.K,

  eventContext: computed(function() {
    return this.get('targetObject') || this;
  }),

  dataObserver: observer('data', 'data.[]', function() {
    this.drawChart();
  }),

  drawChart() {
    nv.addGraph(() => {
      var chart;

      var selector = "#" + this.get('elementId');
      var chartType = this.get('type');
      var options = this.get('options');

      if (isNone(nv.models[chartType])) {
        throw new TypeError(`Could not find chart of type ${chartType}`);
      }

      Ember.$(selector).html("");

      var svgContainer = d3.select(selector).append("svg");

      chart = nv.models[chartType]();

      this.get('beforeSetup')(svgContainer, chart);

      // Chart Options
      if (options.chart) {
        chart.options(options.chart);
      }

      // Tooltip
      if (chart.tooltip && options.tooltip) {
        chart.tooltip.options(options.tooltip);
      }

      // Legend
      if (chart.legend && options.legend) {
        chart.legend.options(options.legend);
      }

      // Axes
      if (options.axes) {
        let axes = options.axes;
        Object.keys(axes).forEach((axis) => {
          if (chart[axis]) {
            chart[axis].options(axes[axis]);
          } else {
            throw new TypeError(`Could not find axis of type ${axis}`);
          }
        });
      }

      // Dispatched events setup
      this.setupEvents(chart);

      svgContainer.datum(this.get('datum'));
      svgContainer.call(chart);

      this.get('afterSetup')(svgContainer, chart);

      // Handle window resize
      nv.utils.windowResize(chart.update);

      return chart;
    });
  },

  setupEvents(chart) {
    var events = this.get('dispatchEvents');
    var context = this.get('eventContext');

    Object.keys(events).forEach((key) => {
      let eventsObj = events[key];
      Object.keys(eventsObj).forEach((e) => {
        if (chart[key] && chart[key].dispatch) {
          chart[key].dispatch.on(e, function() {
            eventsObj[e].apply(context, arguments);
          });
        }
      });
    });

  },

  onDidInsertElement: on('didInsertElement', function() {
    this.drawChart();
  }),
});
