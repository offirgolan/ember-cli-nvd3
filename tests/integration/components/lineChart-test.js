import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import datum from 'dummy/models/lineChart';

moduleForComponent('nvd3-chart', 'Integration | Component | nvd3 chart | lineChart', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.setProperties({
    type: 'lineChart',
    datum: datum
  });
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nvd3-chart}}`);
  assert.equal(this.$().text().trim(), '');
});
