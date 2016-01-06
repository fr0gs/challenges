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


  dummyTest: ->
    (@get 'benchSuite').add(new Benchmark("DUmmy test", () ->
        console.log 'HEHB'
      ))
        .on('complete', (event) ->
          console.log String event.target
          )
        .run()


  ###
  # Benchmark for the PouchDB put() document use case.
  # This test is only for new items, update is not measured.
  ###
  benchmarkCreate: () ->
    Ember.$.getJSON('bigitem.json').then((doc) =>
      @createTest 10, doc[0]
    )


  ###~
  # createFunction creates a document with a new id and a random title.
  #
  ###
  createTest: (many, doc) ->

    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Create #{many} Items Bench",
      'defer': true

      'minSamples': 50 # From here the benchmark will create a random amount of samples


      # The function to be tested.
      fn: (deferred) =>
        iterations = []
        i = 0
        while i < many
          docAux = Ember.copy doc
          Object.assign docAux, { _id: @makeid() } # New id for each new item.
          iterations.push ((@get 'pouchService').createDoc docAux)
          i++
        Promise.all(iterations).then((response) ->
          response = response.join('')
          #console.log response
          deferred.resolve()
        )
    ))
    .on('complete', (event) =>
      console.log String event.target
      console.log 'number: ' + many + ' average creation time: ' + event.target.stats.mean
      #console.log event.target.stats
      (@get 'pouchService').removeDb()
    )
    .run { 'async': true }



  ###
  # Benchmark for the PouchDB get() document use case.
  # This test will measure the time to retrieve X already created documents in a loop
  ###
  benchmarkGet: () ->
    # Once item is retrieved, must create a number of items in DB before testing the reading.
    Ember.$.getJSON('bigitem.json').then((doc) =>
      many = 200
      iterations = []
      i = 0
      while i < many
        docAux = Ember.copy doc[0]
        Object.assign docAux, { _id: String i } # New id for each new item.
        iterations.push ((@get 'pouchService').createDoc docAux)
        i++
      Promise.all(iterations).then((response) =>
        response = response.join('')
        @getTest many # This won't start until all objects are created.
      )
    )


  getTest: (many) ->
    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Get #{many} Items Bench",
      'defer': true

      'minSamples': 50 # Minimum amount of runs of the test.

      ###
      # Future me, at this point you might not remember it anymore and feel tempted to do the
      # initialization inside the setup() function. Don't. In Benchmark.js there is no
      # support for asynchronous code inside the setup() function, so you have no guarantee
      # that it will fully resolve before entering the fn() function.
      ###

      fn: (deferred) =>
        iterations = []
        i = 0
        while i < many
          iterations.push ((@get 'pouchService').getDoc (String i))
          i++
        Promise.all(iterations).then((response) ->
          #response = response.join('')
          #(console.log ('_id: ' + x._id + ' _rev: ' + x._rev )) for x in response
          deferred.resolve()
        )
    )).on('complete', (event) =>
      console.log String event.target
      console.log 'Get Test-> Number: ' + many + ' average getting time: ' + event.target.stats.mean
      (@get 'pouchService').removeDb()
    )
    .run { 'async': true }


  ###
  # Benchmark for the PouchDB update() document use case.
  # This test will be slightly higher than only updating times as the document must be retrieved each time
  # in order to update its revision too.
  ###
  benchmarkUpdate: () ->
    # Once item is retrieved, must create a number of items in DB before testing the reading.
    Ember.$.getJSON('bigitem.json').then((doc) =>
      many = 2000
      iterations = []
      i = 0
      while i < many
        docAux = Ember.copy doc[0]
        Object.assign docAux, { _id: String i } # New id for each new item.
        iterations.push ((@get 'pouchService').createDoc docAux)
        i++
      Promise.all(iterations).then((response) =>
        response = response.join('')
        @updateTest many # This won't start until all objects are created.
      )
    )

  updateTest: (many) ->
    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Update #{many} Items Bench",
      'defer': true

      'minSamples': 20 # Minimum amount of runs of the test.

      fn: (deferred) =>
        iterations = []
        i = 0
        while i < many
          iterations.push ((@get 'pouchService').getDoc((String i)).then((doc) =>
            (@get 'pouchService').updateDoc doc, doc._rev
          ))
          i++
        Promise.all(iterations).then((response) ->
          deferred.resolve()
        )
    )).on('complete', (event) =>
      console.log String event.target
      console.log 'Update Test-> Number: ' + many + ' average updating time: ' + event.target.stats.mean
      (@get 'pouchService').removeDb()
    )
    .run { 'async': true }


  ###
  # Benchmark for the PouchDB update() document use case.
  # This test will be slightly higher than only updating times as the document must be retrieved each time
  # in order to update its revision too.
  ###
  benchmarkBulkGet: () ->
    # Once item is retrieved, must create a number of items in DB before testing the reading.
    Ember.$.getJSON('bigitem.json').then((doc) =>
      many = 200
      iterations = []
      i = 0
      while i < many
        docAux = Ember.copy doc[0]
        Object.assign docAux, { _id: String i } # New id for each new item.
        iterations.push ((@get 'pouchService').createDoc docAux)
        i++
      Promise.all(iterations).then((response) =>
        response = response.join('')
        @bulkGetTest many
      )
    )

  bulkGetTest: (many) ->
    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Bulk Get #{many} Items Bench",
      'defer': true

      'minSamples': 20 # Minimum amount of runs of the test.

      fn: (deferred) =>
        (@get 'pouchService').getBulkDoc()
          .then((result) ->
            deferred.resolve()
          )
          .catch((err) -> console.log err)

    )).on('complete', (event) =>
      console.log String event.target
      console.log 'Bulk Get Test-> Number: ' + many + ' average bulk getting time: ' + event.target.stats.mean
      (@get 'pouchService').removeDb()
    )
    .run { 'async': true }




`export default BenchService`
