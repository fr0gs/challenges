`import Ember from 'ember'`
`import PouchDB from 'pouchdb'`
`import config from '../config/environment';`

PouchserviceService = Ember.Service.extend

  # Retrieves PouchDB singleton instance
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
  # Returns a promise in both cases, must be handled thereinafter.
  ###
  createUpdateDoc: (id, title) ->
    (@getDoc id)
    .then((doc) =>
      console.log 'Document already exists.'
      (@get 'db').put(
        _id: id
        _rev: doc._rev
        title: title
      )
    )
    .catch((err) =>
      console.log 'Document does not exist'
      (@get 'db').put(
        _id: id
        title: title
      )
    )

  ###
  # Retrieves document from it's id
  #
  # returns a promise.
  ###
  getDoc: (id) ->
    (@get 'db').get id

    ###
    # Removes a document
    #
    # returns a promise.
    ###
  removeDoc: (id) ->
    (@getDoc id)
    .then((doc) =>
      (@get 'db').remove(doc)
    )
    .catch((err) =>
      console.log 'removeDoc: Problem getting the document'
    )

`export default PouchserviceService`
