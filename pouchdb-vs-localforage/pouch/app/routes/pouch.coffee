`import Ember from 'ember'`

PouchRoute = Ember.Route.extend

  benchService: Ember.inject.service 'bench'

  activate: ->
    (@get 'benchService').benchmarkCreate('pouch')
    #(@get 'benchService').testFunction()


`export default PouchRoute`
