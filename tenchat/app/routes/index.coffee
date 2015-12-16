`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  iosock: Ember.inject.service 'iosocket'
  # activate function called when the application enters the route first time.
  activate: ->
    s = @get 'iosock'
    s.listenOnBroadCast (data) =>
      c = @get 'controller'
      arrayMessages = c.get 'myMessages'
      arrayMessages = [] if arrayMessages == undefined
      arrayMessages.pushObject (Ember.Object.create data)
      c.set 'myMessages', arrayMessages

  actions:
    sendChat: (username, message) ->
      aux = @get 'iosock'
      aux.sendToChat(
        user: username
        msg: message
      )

`export default IndexRoute`
