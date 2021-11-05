import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Swapandstake from './pages/swapandstake';
import Stake from './pages/stake';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router(prop) {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace /> },
        { path: 'dashboard', element: <DashboardApp key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> },
        { path: 'login', element: <Login key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> },
        { path: '404', element: <NotFound key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> },
        { path: 'swapandstake', element: <Swapandstake key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> },
        { path: 'stake', element: <Stake key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> },
        { path: '*', element: <Navigate to="/404" key={prop.wallet}  wallet={prop.wallet} init={prop.init}/> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
