import React from 'react';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'
import Routing from "./Components/Routing"
function App() {
  
  const routing = (
    <Router>
      <div>
        <Switch>
          <Routing/>
        </Switch>
      </div>
    </Router>
  )

  return (
    routing
  )
}

  


  

// const AppNavigator = createStackNavigator(
//   {
//     Home: HomeScreen,
//     Details: DetailsScreen,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

export default App;
