
import { useEffect, useState } from 'react';
import './App.css';

import { Main } from './Pages/main';
import { Route, Routes } from 'react-router-dom';
import { Favorite } from './Pages/Favorite';
import { Header } from './Components/Header';


function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')
  const [favourites, setFavourites] = useState([])
  const [turnir, setturnir] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/turnirs")
      .then((response) => response.json())
      .then((result) => {
          setturnir(result)
      })
      .catch((error) => console.log(error))
}, [])

  const FavoriteCards = turnir.filter(turnir => favourites.includes(turnir.id))

  const filterArray = turnir.filter(el => el.name.toLowerCase().includes(inputName.toLowerCase()) && el.category.includes(category))

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

  const ChangeFavourites = (id) => {
    favourites.includes(id) ? setFavourites(favourites.filter((i) => i !== id)) : setFavourites([...favourites, id])
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
              favourites={favourites}
              filterArray={filterArray}
              category={category}
              openFilter={openFilter}
            />
          }
        />
        <Route path="/favorite" element={<Favorite FavoriteCards={FavoriteCards} />} />
      </Routes>
    </div>
  );
}

export default App;
