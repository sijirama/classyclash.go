import { useAppSelector } from '../app/hooks'
//import Login from '../pages/Login'
import { Navigate , Outlet } from 'react-router-dom'


function PrivateRoute() {

    const {userInfo} = useAppSelector((state) => state.auth)
    return userInfo ? <Outlet /> : <Navigate to="login" replace />
    

}

export default PrivateRoute
