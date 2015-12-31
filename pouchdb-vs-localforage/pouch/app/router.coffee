`import Ember from 'ember'`
`import config from './config/environment'`


Router = Ember.Router.extend
  location: config.locationType

# Define the routes to the resources and contexts here
# The name of the route (eg: 'thing') should be used in the tab for the
# dispatched types.
Router.map ->
  @route 'pouch'
  @route 'localforage'


`export default Router`
