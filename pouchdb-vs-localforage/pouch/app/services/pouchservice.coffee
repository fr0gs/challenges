`import Ember from 'ember'`
`import PouchDB from 'pouchdb'`
`import config from '../config/environment';`

PouchserviceService = Ember.Service.extend

  # Creates or retrieves PouchDB singleton instance
  db: new PouchDB(config.pouchName || 'localpouch')

  makeid: ->
    text = ''
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    i = 0
    while i < 5
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      i++
    text

  # Removes the actual database
  removeDb: ->
    @get('db').destroy()
      .then((response) ->
        console.assert response.ok, true
        console.log 'Tearing down this hella DB'
      )
      .catch((err) -> console.log 'Error destroying DB')


  ###
  # Creates a new doc. Will fail if doc already exists.
  ###
  createDoc: (doc) ->
    (@get 'db').put(doc).then((response) ->
      #console.log response
    ).catch((err) ->
      #console.log err
    )

  ###
  # Updates a document with a given revision. Assumes document has been
  # previosly fetched so revision number is available
  ###
  updateDoc: (doc, revision) ->
    (@get 'db').put(doc, doc._id, revision).then((response) ->
      console.log response
    ).catch((err) ->
      console.log err
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
