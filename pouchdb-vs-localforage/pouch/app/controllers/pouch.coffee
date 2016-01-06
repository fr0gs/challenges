`import Ember from 'ember'`

PouchController = Ember.Controller.extend

  isLoopCreate: false
  isLoopGet: false
  isBulkRead: false
  buttonClicked: false

  benchService: Ember.inject.service 'bench'
  benchData: Ember.inject.service 'benchdata'

  loopCreate: undefined
  loopGet: undefined
  bulkRead: undefined

  init: ->
    @_super()
    (@get 'benchData').pouchLoopCreateData().then((doc) =>
      @set 'loopCreate', doc
    )
    (@get 'benchData').pouchLoopGetData().then((doc) =>
      @set 'loopGet', doc
    )
    (@get 'benchData').pouchBulkReadData().then((doc) =>
      @set 'bulkRead', doc
    )

  actions:
    clickLoopCreate: () ->
      @set 'buttonClicked', true
      @set 'isLoopCreate', true
    clickLoopGet: () ->
      @set 'buttonClicked', true
      @set 'isLoopGet', true
    clickBulkRead: () ->
      @set 'buttonClicked', true
      @set 'isBulkRead', true


`export default PouchController`
