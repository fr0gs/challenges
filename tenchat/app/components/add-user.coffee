`import Ember from 'ember'`

AddUserComponent = Ember.Component.extend
  actions: {
    sendUserName: (username) ->
      @sendAction 'enterChat', username
  }

`export default AddUserComponent`
