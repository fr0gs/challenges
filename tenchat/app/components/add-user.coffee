`import Ember from 'ember'`

AddUserComponent = Ember.Component.extend
  actions: {
    printUserConsole: (username) ->
      console.log(username)
  }

`export default AddUserComponent`
