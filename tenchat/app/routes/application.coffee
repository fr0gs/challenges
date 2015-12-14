`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend
  # activate function called when the application enters the route first time.
  activate: ->
    socket = io()
    @set 'socket', socket # the socket variable is in the application scope.
    socket.emit 'justarrived', { msg: 'Tell everyone I am home!' }
    socket.on 'response', (data) ->
      console.log data

`export default ApplicationRoute`
