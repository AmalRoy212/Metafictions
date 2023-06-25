import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoutes() {
  const { token } = useSelector((state) => state.admin );
  return token ? <Outlet /> : <Navigate to={'/admin'} replace />
}

export default PrivateRoutes
