`import Ember from 'ember'`

ChatRoute = Ember.Route.extend
  model: ->
    @modelFor 'index'

`export default ChatRoute`
