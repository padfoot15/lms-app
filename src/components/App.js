import MainTab from './MainTab';
import { Route, Routes} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes';
import SignUp from './login/signup';
import { Container } from 'react-bootstrap';
import Login from './login/login';

function App() {
  return (
    <>
      <Container 
            className='d-flex align-items-center justify-content-center'
            style={{minHeight : "100vh"}}
      >
      <div className='w-100' style={{ maxWidth : "400px"}}>
      <Routes>                
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={<MainTab />} />
        </Route>
        
          
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>
        
      </Routes>
      </div>
      </Container>      
    </>
  );
}

export default App;
