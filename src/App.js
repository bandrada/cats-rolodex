import { useState, useEffect } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {

  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setCats(users));
  }, []);
  
  useEffect(() => {
    const newFilteredCats = cats.filter((cat) => {
      return cat.name.toLowerCase().includes(searchField);
    });
    setFilteredCats(newFilteredCats);
  }, [cats, searchField]);

  const onSearchChange = (event) => {
    const search = event.target.value.toLowerCase();
    setSearchField(search);
  }

    return (
    <div className='App'>
      <h1 className='app-title'>Cats Rolodex</h1>
      <SearchBox 
        className='monster-search-box' 
        placeholder='search cats' 
        onChangeHandler={onSearchChange}
      />
      <CardList users={ filteredCats }/>
    </div>
  );
}

export default App;
