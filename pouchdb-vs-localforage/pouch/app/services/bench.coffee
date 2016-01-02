`import Ember from 'ember'`
`import Benchmark from 'npm:benchmark'`

BenchService = Ember.Service.extend
  service: undefined
  benchName: undefined
  maxTimes: 10
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

  asyncLoopOrdered: (times) ->
    iterations = []
    i = 0
    while i < times
      iterations.push (@testFunction i)
      i++
    Promise.all(iterations).then((output) ->
      output.join('')
    )

  # testFunction will call the service, perform the operation and return a Promise.
  testFunction: (n) ->
    (@get('pouchService').createUpdateDoc((String n), @makeid()))


  benchmarkCreate: (what) ->
    result = {}

    (@get 'benchSuite').add(new Benchmark('Create Items Bench',
      'defer': true

      fn: (deferred) =>
        iterations = []
        times = @get 'maxTimes'
        i = 0
        while i < times
          iterations.push (@testFunction i)
          i++
        Promise.all(iterations).then((output) ->
          output.join('')
          deferred.resolve()
        )

    ))
    .on('complete', (event) =>
      @get('pouchService').removeDb()
      console.log String(event.target)
    )
    .run()

`export default BenchService`
