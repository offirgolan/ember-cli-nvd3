import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import datum from 'dummy/models/lineChart';

moduleForComponent('nvd3-chart', 'Integration | Component | nvd3 chart | lineChart', {
  integration: true,
  beforeEach() {
    this.set('type', 'lineChart');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{nvd3-chart type=type}}`);
  assert.equal(this.$().text(), '');
});

test('it displays data', function(assert) {
  assert.expect(1);
  let done = assert.async();
  this.set('datum', datum);

  this.render(hbs`{{nvd3-chart type=type datum=datum}}`);
  Ember.run.later(() => {
    assert.equal(this.$('.nvd3-svg g.nv-scatterWrap g.nv-groups .nv-group').length, datum.length);
    done();
  }, 2000);
});
