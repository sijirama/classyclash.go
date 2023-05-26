import Header from './components/Header'
import {Outlet} from "react-router-dom"
import {Container} from "react-bootstrap"

function App() {
  return (
    <div className="App">
        <Header />
        <Container className='mb-3' >
            <Outlet />
        </Container>
   </div>
  )
}

export default App
