`import Ember from 'ember'`

PouchController = Ember.Controller.extend

  pouchService: Ember.inject.service 'pouchservice'

  init: () ->
    pouchDatabase = (@get 'pouchService').createUpdateDoc '2', 'KAKA'
    (@get 'pouchService').removeDb()


`export default PouchController`
