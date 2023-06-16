import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoutes() {
  const { token } = useSelector((state) => state.auth );
  return token ? <Outlet /> : <Navigate to={'/admin/login'} replace />
}

export default PrivateRoutes
