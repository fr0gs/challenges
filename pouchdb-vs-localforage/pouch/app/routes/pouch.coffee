`import Ember from 'ember'`

PouchRoute = Ember.Route.extend

  benchService: Ember.inject.service 'bench'

  model: ->


  activate: ->
    #(@get 'benchService').benchmarkCreate()
    (@get 'benchService').benchmarkGet()
    #(@get 'benchService').dummyTest()


`export default PouchRoute`
