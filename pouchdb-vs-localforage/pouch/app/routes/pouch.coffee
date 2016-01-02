`import Ember from 'ember'`

PouchRoute = Ember.Route.extend

  benchService: Ember.inject.service 'bench'

  activate: ->
    #(@get 'benchService').benchmarkCreate('pouch')
    #(@get 'benchService').asyncLoopOrdered().then((response) -> console.log response)
    (@get 'benchService').testFunction()


`export default PouchRoute`
