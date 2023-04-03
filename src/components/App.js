import MainTab from './MainTab';
import { Route, Routes} from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes';
import SignUp from './login/signup';
import Login from './login/login';

function App() {
  return (
    <>
      
      <Routes>                
        <Route element={<ProtectedRoutes/>}>
          <Route path='/lms-app' element={<MainTab />} />
        </Route>                
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/login' element={<Login />}/>    
      </Routes>          
    </>
  );
}

export default App;
