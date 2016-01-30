`import Ember from 'ember'`

CardNewsComponent = Ember.Component.extend
  classNames: ['card-component']
  cardColors: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink']

  cardColor: Ember.computed 'cardColors', ->
    which = Math.floor(Math.random() * (@get 'cardColors').length)
    (@get 'cardColors')[which]

`export default CardNewsComponent`
