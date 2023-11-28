import { useLocation, Navigate, Route } from 'react-router-dom';
import PropTypes from "prop-types";


function PrivateRoute({ element, ...rest }) {
  const location = useLocation();
  const user = localStorage.getItem('user');

  const isLoggedIn = user != null;

  return (
    <Route {...rest} element={isLoggedIn ? element : <Navigate to="/login" state={{ from: location }} replace />} />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  element: PropTypes.element,
};