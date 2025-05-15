
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './Pages/Main/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Pages/Favorite/Favorite';
import { Header } from './Components/Header';
import { fetchFavorite } from './Pages/Favorite/FavoriteSlice';
import { useDispatch } from 'react-redux';
import { fetchTurnirs } from './Pages/Main/TurnirsSlice';
import { CartTurnirs } from './Pages/CartTurnirs/CartTurnirs';
import { fetchCartTurnirs } from './Pages/CartTurnirs/CartTurnirsSlice';
import { Turnir } from './Pages/Turnir/turnir';


function App() {
  const [inputName, setInputName] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setsort] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTurnirs({ inputName, category, sort }))
  }, [inputName, category, sort])

  useEffect(() => {
    dispatch(fetchFavorite())
    dispatch(fetchCartTurnirs())
  }, [])

  const handleInput = (text) => {
    setInputName(text)
  }

  const handleChandeCategory = (changetcategory) => {
    if (changetcategory === category) {
      setCategory('')
    } else
      setCategory(changetcategory)
  }

  const handleChangeSort = (order) => {
    if (order === sort){
      setsort('')
      return
    }
    setsort(order)
  }

  return (
    <div>
      <Header handleInput={handleInput} handleChandeCategory={handleChandeCategory} category={category} />
      <Routes>
        <Route path="/"
          element={<Main handleChangeSort={handleChangeSort} sort={sort} />}
        />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/cartturnirs" element={<CartTurnirs />} />
        <Route path="/turnir/:id" element={<Turnir />} />
      </Routes>
    </div>
  );
}

export default App;
