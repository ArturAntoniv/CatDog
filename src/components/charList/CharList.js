import React, { useState } from 'react';
import './charList.scss';
import '../style/char.scss';
import { Link } from 'react-router-dom';
import useAnimals from '../hooks.js/http.hooks';  // Імпортуємо наш хук

const CharList = () => {
    const animals = useAnimals();  // Використовуємо хук для отримання тварин
    const [searchQuery, setSearchQuery] = useState('');  // Стейт для збереження введеного тексту пошуку

    // Функція для обробки введення в полі пошуку
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());  // Зберігаємо введений текст (перетворений в нижній регістр)
    };

    // Фільтрація тварин за ім'ям
    const filteredAnimals = animals.filter(animal =>
        animal.name.toLowerCase().includes(searchQuery)
    );

    return (
        <>
            <header className="searchForm">
                <form>
                    <input 
                        type="search" 
                        name="searchForm" 
                        placeholder="Пошук..." 
                        value={searchQuery}  // Встановлюємо значення введеного тексту
                        onChange={handleSearchChange}  // Обробляємо зміну
                    />
                </form>
            </header>

            <div className="charList">
                {filteredAnimals.length > 0 ? (
                    filteredAnimals.map((animal, index) => (
                        <div key={index} className="charItem">
                            <Link to={`/CharElement/${animal.id}`}>
                                <img src={animal.imageUrl} alt={animal.name} />
                                <div className="charName">{animal.name}</div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>  // Якщо жодна тварина не підходить за пошуковим запитом
                )}
            </div>
        </>
    );
};

export default CharList;
