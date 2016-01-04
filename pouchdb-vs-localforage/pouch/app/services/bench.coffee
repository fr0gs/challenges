`import Ember from 'ember'`
`import Benchmark from 'npm:benchmark'`

BenchService = Ember.Service.extend
  pouchService: Ember.inject.service 'pouchservice'
  localForageService: Ember.inject.service 'localforageservice'
  benchSuite: new Benchmark.Suite 'Benchmark PouchDB & LocalForage'

  makeid: ->
    text = ''
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    i = 0
    while i < 5
      text += possible.charAt(Math.floor(Math.random() * possible.length))
      i++
    text


  ###~
  #  Each Benchmark added to the benchmark suite is going to be executed
  #  a random amount of times (~100/function to test)
  #
  ###
  benchmarkCreate: () ->
      result = {}
      Ember.$.getJSON('bigitem.json').then((doc) =>
        @createUpdateTest 1, result, doc[0] # Takes the JSON only
      )


  ###~
  # createUpdateFunction creates/updates a document with a new id and a random title.
  #
  ###
  createUpdateTest: (many, res, doc) ->

    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Create #{many} Items Bench",
      'defer': true

      # The function to be tested.
      fn: (deferred) =>
        iterations = []
        i = 0
        while i < many
          # ID is changed in every loop so a new item is always going to be created.
          doc._id = @makeid()
          iterations.push (@get('pouchService').createUpdateDoc doc)
          i++
        Promise.all(iterations).then((response) ->
          deferred.resolve()
        )
    ))
    .on('complete', (event) =>
      (@get 'pouchService').removeDb()
      res[many] = event.target.times.elapsed
    )
    .run()




`export default BenchService`
