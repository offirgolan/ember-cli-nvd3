/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-nvd3',

  included: function(app) {
      this._super.included(app);

      var options = app.options['ember-cli-nvd3'];

      app.import(app.bowerDirectory + '/d3/d3.js');
      app.import(app.bowerDirectory + '/nvd3/build/nv.d3.js');

      if(options === undefined || options.includeCss !== false) {
        app.import(app.bowerDirectory + '/nvd3/build/nv.d3.css');
      }
    },
};
