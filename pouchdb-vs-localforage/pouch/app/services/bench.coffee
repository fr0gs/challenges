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


  ###~
  #  Each Benchmark added to the benchmark suite is going to be executed
  #  a random amount of times (~100/function to test)
  #
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


  benchmarkGet: () ->
    Ember.$.getJSON('bigitem.json').then((doc) =>
      @getTest 10, doc[0]
    )

  getTest: (many, doc) ->
    # One test for each different number of items
    (@get 'benchSuite').add(new Benchmark("Get #{many} Items Bench",
      'defer': true

      'minSamples': 50 # From here the benchmark will create a random amount of samples

      # Creates as many objects as needed before reading.
      # If this test is slower than creating means that this
      # setup() function is taken into account when measuring the whole
      # test...
      setup: =>
        iterations = []
        i = 0
        while i < many
          docAux = Ember.copy doc
          Object.assign docAux, { _id: String i } # New id for each new item.
          iterations.push ((@get 'pouchService').createDoc docAux)
          i++
        Promise.all(iterations).then((response) ->
          response = response.join('')
        )

      # The function to be tested.
      fn: (deferred) =>
        iterations = []
        i = 0
        while i < many
          iterations.push ((@get 'pouchService').getDoc String (i))
          i++
        Promise.all(iterations).then((response) ->
          response = response.join('')
          deferred.resolve()
        )
    )).on('complete', (event) =>
      console.log String event.target
      console.log 'Get Test-> Number: ' + many + ' average getting time: ' + event.target.stats.mean
      #console.log event.target.stats
      (@get 'pouchService').removeDb()
    )
    .run { 'async': true }




`export default BenchService`
