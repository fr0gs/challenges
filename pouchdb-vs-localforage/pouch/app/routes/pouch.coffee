`import Ember from 'ember'`

PouchRoute = Ember.Route.extend

  benchService: Ember.inject.service 'bench'
  benchData: Ember.inject.service 'benchdata'

  model: ->
    #(@get 'benchData').pouchLoopCreateData()
    #(@get 'benchData').pouchLoopGetData()
    #(@get 'benchData').pouchLoopCreateData()
    #(@get 'benchData').pouchBulkReadData()

  activate: ->
    (@get 'benchService').benchmarkUpdate()
    #(@get 'benchService').benchmarkCreate()
    #(@get 'benchService').benchmarkGet()
    #(@get 'benchService').benchmarkBulkGet()

  actions:
    willTransition: () ->
      c = @get 'controller'
      c.set 'isLoopCreate', false
      c.set 'isLoopGet', false
      c.set 'isBulkRead', false
      c.set 'buttonClicked', false

`export default PouchRoute`
