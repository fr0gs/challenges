`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'add-user', 'Integration | Component | add user', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{add-user}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#add-user}}
      template block text
    {{/add-user}}
  """

  assert.equal @$().text().trim(), 'template block text'
