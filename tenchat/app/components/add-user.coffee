`import Ember from 'ember'`

AddUserComponent = Ember.Component.extend
  userService: Ember.inject.service 'userservice'
  myUserName: Ember.computed 'userService.user', () ->
    aux = @get 'userService'
    aux.getUser()
  isUserDefined: Ember.computed 'userService.user', () ->
    aux = @get 'userService'
    aux.hasUser()
  actions:
    sendUserName: (str) ->
      aux = @get 'userService'
      aux.setUser str
    sendChat: (message) ->
      @sendAction( # Apparently the only way to call multiple argument functions
        'sendChat'
        @get 'myUserName'
        message
      )

`export default AddUserComponent`
