import './App.css';

import Homepage from './pages/homepage';
import NavBar from './components/navbar';
import Team from './pages/team';
import Rota from './pages/rota';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterEmployee from './pages/register-employee';
import RegisterManager from './pages/register-manager';
import RegisterCompany from './pages/register-company';
import Login from './pages/login';
import NotFound from './pages/notfound';

import { useDispatch, Provider } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './features/user';

import { store } from './store';

function AppContent() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (

    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route
          path='/'
          element={
            <Homepage />
          }
        />
        <Route
          path='/team'
          element={
            <Team />
          }
        />
        <Route
          path='/rota'
          element={
            <Rota />
          }
        />
        <Route
          path='/login'
          element={
            <Login />
          }
        />
        <Route
          path='/register-employee'
          element={
            <RegisterEmployee />
          }
        />
        <Route
          path='/register-employer'
          element={
            <RegisterManager />
          }
        />
        <Route
          path='/register-company'
          element={
            <RegisterCompany />
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )

}

export default App;
