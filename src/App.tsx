import Home from '@Pages/Home/Home'
import Search from '@Pages/Search/Search'
import TV from '@Pages/TV/TV'
import Header from '@ui/Decorator/Header'
import React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

interface Props {

}

const App = (props: Props) => {

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={["/", "/movies/:movieId"]}>
          <Home />
        </Route>
        <Route exact path="/tv">
          <TV />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
      </Switch>
    </BrowserRouter>
  )

}

export default App
