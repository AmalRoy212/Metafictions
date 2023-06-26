import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminPrivateRoute() {
  const { adminToken } = useSelector((state) => state.admin );
  return adminToken ? <Outlet /> : <Navigate to={'/admin'} replace />
}

export default AdminPrivateRoute
