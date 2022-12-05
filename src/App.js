import './styles/App.css'
import Home from './pages/Home'
import About from './pages/About'
import promoVid from './vids/promo.mp4'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Booking from './pages/Booking'
import Events from './pages/Events'
import Gallery from './pages/Gallery'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home video={promoVid} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/events'>
          <Events />
        </Route>
        <Route path='/gallery'>
          <Gallery />
        </Route>
        <Route path='/booking'>
          <Booking />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
