import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAnimals from '../hooks.js/http.hooks';  // Імпортуємо хук для отримання тварин
import './charElement.scss';
import '../style/char.scss';

const CharElement = () => {
  // Отримуємо ID тварини з URL
  const { animalId } = useParams();

  // Отримуємо список всіх тварин
  const animals = useAnimals();  
  
  // Створюємо стейт для конкретної тварини
  const [animal, setAnimal] = useState(null);

  const [catsWithSameName, setCatsWithSameName] = useState([]); // Стейт для котів з таким самим іменем

  // Використовуємо useEffect для оновлення стейту при зміні списку тварин
  useEffect(() => {
    // Шукаємо конкретну тварину за ID
    const foundAnimal = animals.find((animal) => animal.id.toString() === animalId);
    setAnimal(foundAnimal);

    if (foundAnimal && foundAnimal.type === 'cat') {
      // Фільтруємо котів за іменем
      const sameNamedCats = animals.filter((cat) => cat.type === 'cat' && cat.name === foundAnimal.name);
      setCatsWithSameName(sameNamedCats); // Зберігаємо в стейті котів з однаковим іменем
    }
  }, [animals, animalId]);

  // Якщо тварина не знайдена
  if (!animal) {
    return <div>Шукаю інформацію...</div>;
  }

  // Перевіряємо тип тварини (кит чи собака)
  const isCat = animal.type === 'cat';
  const isDog = animal.type === 'dog';
  const breed = animal.breeds && animal.breeds[0]; // Отримуємо породу тварини, якщо вона є

  return (
    <div className="charElement">
      <div className="char">
        {/* Зображення тварини */}
        <img src={animal.imageUrl} alt={animal.name} />
        
        <article className="charDescription">
            <h2>{animal.name}</h2>
            {/* Тип тварини */}
            <p>Тип: {isCat ? 'Кіт' : isDog ? 'Собака' : 'Невідомо'}</p>
            {/* Темперамент */}
            <p>Темперамент: {breed ? breed.temperament : (animal.temperament || 'Темперамент невідомий')}</p>
            {/* Країна походження */}
            <p>Країна походження: {breed ? breed.origin : (animal.origin || 'Невідомо')}</p>
            {/* Життєвий цикл */}
            <p>Життєвий цикл: {breed ? breed.life_span : (animal.life_span || 'Невідомо')} років</p>

            {/* Вага */}
            <p>
                Вага: {animal.weight !== 'Невідомо' ? `${animal.weight} кг` : 'Невідомо'}
            </p>
            
            {/* Якщо є посилання на Wikipedia */}
            {animal.wikipedia_url ? (
                <a href={animal.wikipedia_url} target="_blank" rel="noopener noreferrer">
                    Дізнатися більше на Wikipedia
                </a>
            ) : (
                <span>Додаткова інформація відсутня</span>
            )}
        </article>
      </div>


      {/* Відображення зображень тварин з однаковим іменем */}
        <div className="charPhoto">
          {catsWithSameName.length > 0 ? (
            catsWithSameName.map((cat) => (
              <div key={cat.id} className="photo-container">
                <img src={cat.imageUrl} alt={cat.name} />
              </div>
            ))
          ) : (
            <div className="photo-container">
              <img className="photo-container" src={animal.imageUrl} alt={animal.name} />
            </div>
          )}
        </div>
    </div>
  );
};

export default CharElement;

