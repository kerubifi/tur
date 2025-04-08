
import { useState } from 'react';
import './App.css';
import { games } from './Components/Games';
import { Header } from './Components/Header';

function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)

  const filterArray = inputName ? games.filter(el => el.name.includes(inputName)) : games

  const handleInput = (text) => {
    setInputName(text)
  }

  const handleOpen = () =>{
    setOpenFilter(!openFilter)
  }

  return (
    <div>
      <Header handleInput={handleInput} handleOpen={handleOpen} />
      {openFilter && (
        <div className='filter'>
          <div className='active'>Шутер от 1 лица</div>
          <div>Моба</div>
        </div>)}
      <div className='cardsbox'>
        {filterArray.map((el) => (
          <div className='cards'>
            <div><img src={el.img} alt={el.alt} width={30} /></div>
            <div>{el.name}</div>
            <div>Приз: {el.prize}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
