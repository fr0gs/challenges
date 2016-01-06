`import Ember from 'ember'`

BenchdataService = Ember.Service.extend

  pouchLoopCreateData: ->
    Ember.$.getJSON 'pouchloopcreate.json'

  pouchLoopGetData: ->
    Ember.$.getJSON 'pouchloopget.json'

  pouchLoopUpdateData: ->
    Ember.$.getJSON 'pouchloopupdate.json'

  pouchBulkReadData: ->
    Ember.$.getJSON 'pouchbulkread.json'

  pouchBulkWriteData: ->
    Ember.$.getJSON 'pouchbulkwrite.json'

`export default BenchdataService`
