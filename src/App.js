
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './Pages/Main/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Pages/Favorite/Favorite';
import { Header } from './Components/Header';
import { fetchFavorite } from './Pages/Favorite/FavoriteSlice';
import { useDispatch } from 'react-redux';
import { fetchTurnirs } from './Pages/Main/TurnirsSlice';


function App() {
  const [inputName, setInputName] = useState('')
  const [category, setCategory] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTurnirs({inputName, category}))
  }, [inputName, category])

  useEffect(() => {
    dispatch(fetchFavorite())
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

  return (
    <div>
      <Header handleInput={handleInput} handleChandeCategory={handleChandeCategory} category={category} />
      <Routes>
        <Route path="/"
          element={<Main />}
        />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
