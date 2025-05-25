import { useEffect } from 'react';
import './App.css';
import { Main } from './Pages/Main/main.tsx';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import { Favorite } from './Pages/Favorite/Favorite.tsx';
import { Header } from './Components/Header.tsx';
import { useAppDispatch } from './reduxHooks.ts';
import { fetchTurnirs } from './Pages/Main/TurnirsSlice.ts';
import { CartTurnirs } from './Pages/CartTurnirs/CartTurnirs.tsx';
import { Turnir } from './Pages/Turnir/turnir.tsx';
import { AddTurnir } from './Pages/AddTurnir/AddTurnir.tsx';


function App() {

  let [searchParams, setSearchParams] = useSearchParams()

  const newParams = new URLSearchParams(searchParams)

  const handleChangeFilters = (key: string, value: string) => {
    if (newParams.get(key) === value) {
      newParams.delete(key)
      key === '_order' && newParams.delete('_sort')
    } else if (key === '_order') {
      newParams.set('_sort', 'participants')
      newParams.set(key, value)
    } else if (value === '') {
      newParams.delete('q')
    }
    else {
      newParams.set(key, value)
    }
    if (key !== '_page') {
      newParams.set('_page', '1')
    }
    setSearchParams(newParams)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (searchParams) {
      dispatch(fetchTurnirs(searchParams.toString()))
    }
  }, [searchParams])

  useEffect(() => {
    newParams.set('_page', '1')
    setSearchParams(newParams)
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
        <Route path="/addturnir" element={<AddTurnir />} />
      </Routes>
    </div>
  );
}

export default App;
