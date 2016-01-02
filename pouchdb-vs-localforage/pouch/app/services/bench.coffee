`import Ember from 'ember'`
`import Benchmark from 'npm:benchmark'`

BenchService = Ember.Service.extend
  service: undefined
  benchName: undefined
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

  asyncLoopOrdered: (someInput, times) ->
    iterations = []
    i = 0
    while i < times
      iterations.push @testFunction
      i++
    Promise.all(iterations).then(output) ->
      console.log output
      someInput + output.join('')

  # testFunction will call the service, perform the operation and return a Promise.
  testFunction: ->
    (@get('pouchService').createUpdateDoc((String 2), @makeid()))


  benchmarkCreate: (what) ->
    result = {}

    (@get 'benchSuite').add(new Benchmark('Create Items Bench',
      'defer': true

      fn: (deferred) =>
        #@get('pouchService').createUpdateDoc '1', @makeid()
        @get('pouchService').getDoc('1').then((x) -> console.log x)
        deferred.resolve()
    ))
    .on('complete', (event) ->
      @get('pouchService').removeDb()
      console.log String(event.target)
    )
    .run({ 'async': true })

`export default BenchService`
