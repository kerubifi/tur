
import { useEffect, useState } from 'react';
import './App.css';
import { Main } from './Pages/Main/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Pages/Favorite/Favorite';
import { Header } from './Components/Header';
import { addFavorite, delFavorite, fetchFavorite } from './Pages/Favorite/FavoriteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTurnirs } from './Pages/Main/TurnirsSlice';


function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')
  
  const favorite = useSelector((state) => state.favorite.favorite)
  const turnirs = useSelector((state) => state.turnirs.turnirs)

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

  const handleOpen = () => {
    setOpenFilter(!openFilter)
  }

  const handleChandeCategory = (changetcategory) => {
    if (changetcategory === category) {
      setCategory('')
    } else
      setCategory(changetcategory)
  }

  const ChangeFavourites = (turnir) => {
    if (favorite.some(el => el.id === turnir.id)) {
      dispatch(delFavorite(turnir.id))
    }
    else {
      dispatch(addFavorite(turnir))
    }
  }
  return (
    <div>
      <Header handleInput={handleInput} handleOpen={handleOpen} />
      <Routes>
        <Route path="/"
          element={
            <Main
              handleChandeCategory={handleChandeCategory}
              ChangeFavourites={ChangeFavourites}
              favoriteIds={favorite.map(i => i.id)}
              turnirs={turnirs}
              category={category}
              openFilter={openFilter}
            />
          }
        />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
