`import Ember from 'ember'`

PouchController = Ember.Controller.extend()

  #init: () ->
    #(@get 'pouchService').createUpdateDoc('2', 'DOCTEST').then((response) =>
    #  (@get 'pouchService').removeDoc(response.id).then((response) =>
    #    console.log "Document #{response.id} successfully removed"
    #    (@get 'pouchService').removeDb()
    #  )
    #)


`export default PouchController`
