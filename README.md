# Ember CLI NVD3

[![Build Status](https://travis-ci.org/offirgolan/ember-cli-d3.svg)](https://travis-ci.org/offirgolan/ember-cli-d3) 
[![npm version](https://badge.fury.io/js/ember-cli-nvd3.svg)](http://badge.fury.io/js/ember-cli-nvd3)
[![Code Climate](https://codeclimate.com/github/offirgolan/ember-cli-nvd3/badges/gpa.svg)](https://codeclimate.com/github/offirgolan/ember-cli-nvd3)
[![Dependency Status](https://david-dm.org/offirgolan/ember-cli-nvd3.svg)](https://david-dm.org/offirgolan/ember-cli-nvd3)
[![devDependency Status](https://david-dm.org/offirgolan/ember-cli-nvd3/dev-status.svg)](https://david-dm.org/offirgolan/ember-cli-nvd3#info=devDependencies)

An EmberJS [NVD3](http://nvd3.org/) wrapper

## Installation ##
```shell
ember install ember-cli-nvd3
```

## Looking for help? ##
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-cli-nvd3/issues).

## NVD3 Documentation
Before using this addon, you might want to checkout the [NVD3 Docs](https://nvd3-community.github.io/nvd3/)

## Basic Usage ##
All you need to get started is to specify which type of chart you want and the data it should display

```handlebars
{{nvd3-chart type='lineChart' datum=datum}}
```

## Options

### Chart Options
All chart specific options can be specified via the `options.chart` property.

```javascript
options: {
    chart: {
      height: 500,
      color: ["#FF0000","#00FF00","#0000FF"]
  }
}
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum options=options}}
```

### Axes Options
All axis specific options can be specified via the `options.axes` property.

```javascript
options: {
  axes: {
    xAxis: {
      axisLabel: 'Time (ms)'
      tickFormat: d3.format(',r')
    },
    yAxis: {
      axisLabel: 'Voltage (v)'
      tickFormat: d3.format('.02f')
    }
  }
}
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum options=options}}
```

### Tooltip Options
All tooltip specific options can be specified via the `options.tooltip` property.

```javascript
options: {
  tooltip: {
    gravity: 'n',
    headerFormatter(d) { return d + ' monkeys' }
  }
}
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum options=options}}
```

### Legend Options
All legend specific options can be specified via the `options.legend` property.

```javascript
options: {
  legend: {
    rightAlign: false,
    vers: 'furious'
  }
}
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum options=options}}
```

### Dispatch Events
All events you want to dispatch can be specified via the `dispatchEvents` property.

```javascript
dispatchEvents: {
  lines: {
    elementClick(e) {
      alert(`${e.series.key}: (${e.point.x}, ${e.point.y})`);
    }
  }
}
```

Initially, the context of each event is set to the chart's `targetObject` property. This is done so you can interact with your ember object when the event is fired. To override this, you can specify the `eventContext` manually.

```handlebars
{{nvd3-chart type='lineChart' datum=datum dispatchEvents=dispatchEvents eventContext=parent}}
```

### Helper Actions
Currently there are two helper actions provided:

#### 1. beforeSetup
This is called after the svg container is initially created and before any options is set on the chart. 

```javascript
beforeSetup(svgContainer, chart) {}
```
```javascript
// Set the height of the svg container
beforeSetup(svgContainer /*, chart*/) {
  svgContainer.attr({
    height: 500
  });
}
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum beforeSetup=beforeSetup}}
```

#### 2. afterSetup
This is called after all chart options and data have been set, as well as after the chart has been created. 

```javascript
afterSetup(svgContainer, chart) {}
```

```javascript
// Setup click event on all visible x-axis ticks
afterSetup(svgContainer /*, chart*/) {
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
```

```handlebars
{{nvd3-chart type='lineChart' datum=datum afterSetup=afterSetup}}
```


## Styling
This addon imports the nvd3 css into your application. To disable that, add the following to your `ember-cli-build.js`

```javascript
var app = new EmberApp(defaults, {
  'ember-cli-nvd3': {
    includeCss: false
  }
});
```

# Want to help?

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
