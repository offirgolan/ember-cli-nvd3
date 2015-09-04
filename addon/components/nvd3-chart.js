import Ember from 'ember';

const {
  computed,
  observer,
  isNone,
  on
} = Ember;

export default Ember.Component.extend({
  classNames: ['nvd3-chart'],

  datum: [],

  type: "lineChart",

  chartOptions: {},
  axesOptions: {},
  tooltipOptions: {},
  legendOptions: {},

  dispatchEvents: {},

  eventContext: computed(function() {
    return this.get('targetObject') || this;
  }),

  // Actions
  beforeSetup: Ember.K,
  afterSetup: Ember.K,

  dataObserver: observer('data', 'data.[]', function() {
    this.drawChart();
  }),

  drawChart() {
    nv.addGraph(() => {
      var chart;

      var selector = "#" + this.get('elementId');
      var chartType = this.get('type');
      var chartOptions = this.get('chartOptions');
      var axesOptions = this.get('axesOptions');

      if (isNone(nv.models[chartType])) {
        throw new TypeError(`Could not find chart of type ${chartType}`);
      }

      Ember.$(selector).html("");

      var svgContainer = d3.select(selector).append("svg");

      chart = nv.models[chartType]();

      this.get('beforeSetup')(svgContainer, chart);

      // Chart Options
      chart.options(chartOptions);

      // Tooltip
      if (chart.tooltip) {
        chart.tooltip.options(this.get('tooltipOptions'));
      }

      // Legend
      if (chart.legend) {
        chart.legend.options(this.get('legendOptions'));
      }

      // Axes
      Object.keys(axesOptions).forEach((axis) => {
        if(chart[axis]) {
          chart[axis].options(axesOptions[axis]);
        } else {
          throw new TypeError(`Could not find axis of type ${axis}`);
        }
      });

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
        if(chart[key] && chart[key].dispatch) {
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
