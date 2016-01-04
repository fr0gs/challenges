`import Ember from 'ember'`
`import PouchDB from 'pouchdb'`
`import config from '../config/environment';`

PouchserviceService = Ember.Service.extend

  # Creates or retrieves PouchDB singleton instance
  db: new PouchDB(config.pouchName || 'localpouch')

  # Removes the actual database
  removeDb: ->
    @get('db').destroy()
      .then((response) ->
        console.assert response.ok, true
        console.log 'Tearing down this hella DB'
      )
      .catch((err) -> console.log 'Error destroying DB')

  ###~
  # If document already exists it indicates the revision in order to update it,
  # otherwise it will create the document.
  #
  # Documents are fetched by id.
  # Returns a promise in both cases, must be handled thereinafter.
  ###
  createUpdateDoc: (doc) ->
    ((@get 'db').get doc._id)
      .then((resp) => # Update
        console.log 'Document already exists'
        doc._rev = resp._rev
        (@get 'db').put doc
      )
      .catch((err) => # Create
        console.log 'Document does not exist'
        (@get 'db').put doc
      )


    ###
    # Removes a document
    #
    # returns a promise.
    ###
  removeDoc: (doc) ->
    ((@get 'db').get doc._id)
      .then((doc) =>
        (@get 'db').remove(doc)
      )
      .catch((err) =>
        console.log 'removeDoc: Problem getting the document'
      )

`export default PouchserviceService`
