var RSVP = require('rsvp');

module.exports = {
  description: 'Imports NVD3 dependency from Bower',

  normalizeEntityName: function() {},

  afterInstall: function() {
    return RSVP.all([
      this.addBowerPackageToProject('d3'),
      this.addBowerPackageToProject('nvd3', '1.8.1'),
    ]);
  }
};
