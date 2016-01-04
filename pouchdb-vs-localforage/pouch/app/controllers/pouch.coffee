`import Ember from 'ember'`

PouchController = Ember.Controller.extend()

  #pouchService: Ember.inject.service 'pouchservice'

  #init: () ->
    #(@get 'pouchService').createUpdateDoc('2', 'DOCTEST').then((response) =>
      #console.log 'Response object id: ' + (String response.id)
    #)
    #  (@get 'pouchService').removeDoc(response.id).then((response) =>
    #    console.log "Document #{response.id} successfully removed"
    #    (@get 'pouchService').removeDb()
    #  )
    #)


`export default PouchController`
