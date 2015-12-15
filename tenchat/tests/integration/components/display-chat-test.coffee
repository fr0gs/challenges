`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'display-chat', 'Integration | Component | display chat', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{display-chat}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#display-chat}}
      template block text
    {{/display-chat}}
  """

  assert.equal @$().text().trim(), 'template block text'
