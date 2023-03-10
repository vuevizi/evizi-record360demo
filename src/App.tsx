import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {RoutesPath} from './constants/RoutesPath';
import {AdminLayout, AuthLayout} from './layouts';
import {DashBoard, Login} from './pages';

function App() {
  useEffect(() => {
    localStorage.setItem('cursor', JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={RoutesPath.LOGIN} />}
        ></Route>
        <Route element={<AdminLayout />}>
          <Route
            path={RoutesPath.DASHBOARD}
            element={<DashBoard />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route
            path={RoutesPath.LOGIN}
            element={<Login />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
