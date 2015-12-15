`import Ember from 'ember'`

IosocketService = Ember.Service.extend
  io: io()
  listenOnBroadCast: (callback) ->
    sock = @get 'io'
    sock.on 'broadcastMessage', (data) ->
      callback data
  sendToChat: (obj) ->
    sock = @get 'io'
    sock.emit 'chatMessage', obj

`export default IosocketService`
