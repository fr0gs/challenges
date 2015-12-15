`import Ember from 'ember'`

UserserviceService = Ember.Service.extend
  user: undefined

  getUser: ->
    @get 'user'

  setUser: (name) ->
    @set 'user', name

  hasUser: ->
    aux = @get 'user'
    aux != undefined

`export default UserserviceService`
