`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  iosock: Ember.inject.service 'iosocket'
  # activate function called when the application enters the route first time.
  activate: ->
    s = @get 'iosock'
    s.listenOnBroadCast (data) =>
      c = @get 'controller.messages'
      c.set(
        'controller.messages'
        data
      )
  actions:
    sendChat: (username, message) ->
      aux = @get 'iosock'
      aux.sendToChat(
        user: username
        msg: message
      )

`export default IndexRoute`
