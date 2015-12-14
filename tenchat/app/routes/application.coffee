`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend

  activate: ->
    socket = io()
    @set 'socket', socket
    socket.emit 'justarrived', { msg: 'Tell everyone I am home!' }
    socket.on 'response', (data) ->
      console.log data

`export default ApplicationRoute`
