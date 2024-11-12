import { useState, useEffect } from 'react';

const useAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
    const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search?limit=200&has_breeds=1&order=DESC';
    const DOG_API_KEY = 'live_ejTXysIr3teu8NgDVVWBlfR1mLHKssZqFMLOKXIiC40KOi3v3N0tFheNmVOBOs9R';
    const CAT_API_KEY = 'live_DkbQs7pY1sIVGLMUPSlvjouKn1D2gS4Rfn8U30Y8eAA9CNoH37xAxkkBi29NkixG';

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const [dogsResponse, catsResponse] = await Promise.all([
                    fetch(DOG_API_URL, {
                        headers: { 'x-api-key': DOG_API_KEY }
                    }),
                    fetch(CAT_API_URL, {
                        headers: { 'x-api-key': CAT_API_KEY }
                    })
                ]);

                if (!dogsResponse.ok || !catsResponse.ok) {
                    throw new Error('Failed to fetch data from APIs');
                }

                const dogsData = await dogsResponse.json();
                const catsData = await catsResponse.json();

                const dogs = dogsData.map(dog => ({
                    id: dog.id,
                    name: dog.name,
                    imageUrl: dog.image?.url || 'default-dog.jpg',
                    type: 'dog',
                    temperament: dog.temperament || 'Темперамент невідомий',
                    weight: dog.weight.metric,
                    origin: dog.origin || 'Невідомо',
                    life_span: dog.life_span || 'Невідомо',
                    wikipedia_url: dog.wikipedia_url || 'https://uk.wikipedia.org/wiki/%D0%9F%D0%B5%D1%81'
                }));
                console.log(dogs);

                const cats = catsData.map(cat => ({
                    id: cat.id,
                    name: cat.breeds?.[0]?.name || 'Невідомо',
                    imageUrl: cat.url || 'default-cat.jpg',
                    type: 'cat',
                    temperament: cat.breeds?.[0]?.temperament || 'Темперамент невідомий',
                    weight: cat.weight ? cat.weight.metric : 'Невідомо', // Перевірка на наявність weight
                    origin: cat.breeds?.[0]?.origin || 'Невідомо',
                    life_span: cat.breeds?.[0]?.life_span || 'Невідомо',
                    wikipedia_url: cat.breeds?.[0]?.wikipedia_url || 'https://uk.wikipedia.org/wiki/%D0%9A%D1%96%D1%82'
                }));

                // Shuffle and combine animal arrays
                const shuffleArray = array => array.sort(() => Math.random() - 0.5);
                const combinedAnimals = shuffleArray([...dogs, ...cats]);
                
                setAnimals(combinedAnimals);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAnimals();
    }, []);

    return animals;
};

export default useAnimals;
