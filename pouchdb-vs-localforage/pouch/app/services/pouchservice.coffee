`import Ember from 'ember'`
`import PouchDB from 'pouchdb'`
`import config from '../config/environment';`

PouchserviceService = Ember.Service.extend

  # Retrieves PouchDB singleton instance
  db: new PouchDB(config.pouchName || 'localpouch')

  # Removes the actual database
  removeDb: ->
    @get('db').destroy().then((response) ->
      console.assert response.ok, true
      console.log response
    ).catch ((error) ->
      console.log error
    )

  ###~
  # If document already exists it indicates the revision in order to update it,
  # otherwise it will create the document.
  #
  ###
  createUpdateDoc: (id, title) ->
    (@getDoc id).then((doc) =>
      console.log 'Document already exists.'
      (@get 'db').put(
        _id: id
        _rev: doc._rev
        title: title
      ).then((response) ->
        console.log response
      ).catch((err) ->
        console.log err
      )
    ).catch((err) =>
      console.log 'Document does not exist'
      (@get 'db').put(
        _id: id
        title: title
      ).then((response) ->
        console.log response
      ).catch((err) ->
        console.log err
      )
    )

  # Retrieves document from it's id
  getDoc: (id) ->
    (@get 'db').get id

`export default PouchserviceService`
