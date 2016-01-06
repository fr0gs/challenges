`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'pouch-chart', 'Integration | Component | pouch chart', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{pouch-chart}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#pouch-chart}}
      template block text
    {{/pouch-chart}}
  """

  assert.equal @$().text().trim(), 'template block text'
