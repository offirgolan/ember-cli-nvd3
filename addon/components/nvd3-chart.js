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

  _container: null,

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
      let chart;
      let chartType = this.get('type');
      let selector = "#" + this.get('elementId');

      if (isNone(nv.models[chartType])) {
        throw new TypeError(`Could not find chart of type ${chartType}`);
      }

      Ember.$(selector).html("");

      let svgContainer = d3.select(selector).append("svg");

      chart = nv.models[chartType]();

      this.set('_container', svgContainer);

      this.get('beforeSetup')(svgContainer, chart);

      this.evaluateOptions(chart);

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

  evaluateOptions(chart) {
    let options = this.get('options');
    let type = this.get('type');
    Object.keys(options).forEach(key => {
      if (key === 'chart' && chart.options) {
        chart.options(options[key]);
      } else if (chart[key] && chart[key].options) {
        chart[key].options(options[key]);
      } else {
        Ember.Logger.warn(`${key} is not a valid property for chart of type '${type}'`);
      }
    });
  },

  setupEvents(chart) {
    var events = this.get('dispatchEvents');
    var context = this.get('eventContext');
    var container = this.get('_container');

    Object.keys(events).forEach((key) => {
      let eventsObj = events[key];
      Object.keys(eventsObj).forEach((e) => {
        let dispatchingObj = key === 'chart' ? chart : chart[key];
        if (dispatchingObj && dispatchingObj.dispatch) {
          dispatchingObj.dispatch.on(e, function() {
            eventsObj[e].call(context, container, chart, ...arguments);
          });
        }
      });
    });

  },

  onDidInsertElement: on('didInsertElement', function() {
    this.drawChart();
  }),
});
