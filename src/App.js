
import { useState } from 'react';
import './App.css';
import { games } from './Components/Games';
import { Header } from './Components/Header';

function App() {
  const [inputName, setInputName] = useState('')
  const [openFilter, setOpenFilter] = useState(false)
  const [category, setCategory] = useState('')

  const filterArray = games.filter(el => el.name.toLowerCase().includes(inputName.toLowerCase()) && el.category.includes(category))

  const handleInput = (text) => {
    setInputName(text)
  }

  const handleOpen = () => {
    setOpenFilter(!openFilter)
  }

  const handleChandeCategory = (changetcategory) => {
    if(changetcategory === category){
      setCategory('')
    }else
    setCategory(changetcategory)
  }

  return (
    <div>
      <Header handleInput={handleInput} handleOpen={handleOpen} />
      {openFilter && (
        <div className='filter'>
          <div onClick={() => handleChandeCategory('1-person-shooter')} className={category === '1-person-shooter' && 'active'}>Шутер от 1 лица</div>
          <div onClick={() => handleChandeCategory('moba')} className={category === 'moba' && 'active'}>Моба</div>
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
