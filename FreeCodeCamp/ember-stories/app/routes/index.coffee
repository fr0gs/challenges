`import Ember from 'ember'`

IndexRoute = Ember.Route.extend
  newsPromise: undefined

  model: ->
    Ember.$.getJSON("http://www.freecodecamp.com/news/hot")


`export default IndexRoute`
