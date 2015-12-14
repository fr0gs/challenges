`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  model: ->
    userName: undefined
  actions:
    enterChat: (username) ->
      @set 'model.userName', username
      @transitionTo 'chat'

`export default IndexRoute`
