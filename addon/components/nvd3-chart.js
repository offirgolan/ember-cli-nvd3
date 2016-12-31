import Ember from 'ember';
import d3 from 'd3';
import nv from 'nv';

const {
  observer,
  isNone,
  run,
  on,
  $
} = Ember;

export default Ember.Component.extend({
  classNames: ['nvd3-chart'],
  type: 'lineChart',
  datum: null,
  options: null,
  dispatchEvents: null,
  eventContext: null,

  _container: null,
  _chart: null,

  reDraw: on('didInsertElement', observer('datum', 'datum.[]', function() {
    this._reDrawTimer = run.scheduleOnce('render', this, 'drawChart');
  })),

  drawChart() {
    nv.addGraph(() => {
      if (this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }

      let chart;
      let chartType = this.get('type');
      let selector = `#${this.get('elementId')}`;
      let svgContainer;

      if (isNone(nv.models[chartType])) {
        throw new TypeError(`Could not find chart of type ${chartType}`);
      }

      $(selector).html('');

      svgContainer = d3.select(selector).append('svg');
      chart = nv.models[chartType]();

      this.set('_container', svgContainer);
      this.set('_chart', chart);

      run(() => this.sendAction('beforeSetup', svgContainer, chart));

      this.evaluateOptions(chart);

      // Dispatched events setup
      this.setupEvents(chart);

      svgContainer.datum(this.get('datum'));
      svgContainer.call(chart);

      run(() => this.sendAction('afterSetup', svgContainer, chart));

      // Handle window resize
      this.set('_windowResizeHandler', nv.utils.windowResize(chart.update));

      return chart;
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    const chart = this.get('_chart');
    const resizeHandler = this.get('_windowResizeHandler');

    if(resizeHandler && resizeHandler.clear) {
      resizeHandler.clear();
    }

    // Remove tooltips
    if(chart.tooltip) {
      chart.tooltip.hideDelay(0); // Set the delay to 0 so tooltips will be instantly removed
      chart.tooltip.hidden(true);
    }

    // Cancel pending redraws
    run.cancel(this._reDrawTimer);
  },

  evaluateOptions(chart) {
    let options = this.get('options') || {};
    let type = this.get('type');

    Object.keys(options).forEach(key => {
      if (key === 'chart' && chart.options) {
        chart.options(options[key]);
      } else if (chart[key] && chart[key].options) {
        chart[key].options(options[key]);
      } else {
        throw new Error(`${key} is not a valid property for chart of type '${type}'`);
      }
    });
  },

  setupEvents(chart) {
    var events = this.get('dispatchEvents') || {};
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
  }
});
