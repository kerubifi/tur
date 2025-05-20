
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './Pages/Main/main';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Favorite } from './Pages/Favorite/Favorite';
import { Header } from './Components/Header';
import { fetchFavorite } from './Pages/Favorite/FavoriteSlice';
import { useDispatch } from 'react-redux';
import { fetchTurnirs } from './Pages/Main/TurnirsSlice';
import { CartTurnirs } from './Pages/CartTurnirs/CartTurnirs';
import { fetchCartTurnirs } from './Pages/CartTurnirs/CartTurnirsSlice';
import { Turnir } from './Pages/Turnir/turnir';


function App() {

  let [searchParams, setSearchParams] = useSearchParams()

  const newParams = new URLSearchParams(searchParams)

  const handleChangeFilters = (key, value) => {
    if (newParams.get(key) === value) {
      newParams.delete(key)
      key === '_order' && newParams.delete('_sort')
    } else if (key === '_order') {
      newParams.set('_sort', 'participants')
      newParams.set(key, value)
    }
    else {
      newParams.set(key, value)
    }
    if (key !== '_page') {
      newParams.set('_page', 1)
    }
    setSearchParams(newParams)
  }

  const dispatch = useDispatch()

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchTurnirs(searchParams.toString()))
    }
  }, [searchParams])

  useEffect(() => {
    newParams.set('_page', 1)
    setSearchParams(newParams)
    dispatch(fetchFavorite())
    dispatch(fetchCartTurnirs())
  }, [])

  return (
    <div>
      <Header handleChangeFilters={handleChangeFilters} searchParams={searchParams} />
      <Routes>
        <Route path="/"
          element={<Main handleChangeFilters={handleChangeFilters} searchParams={searchParams} />}
        />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cartturnirs" element={<CartTurnirs />} />
        <Route path="/turnir/:id" element={<Turnir />} />
      </Routes>
    </div>
  );
}

export default App;
