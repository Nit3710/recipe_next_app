'use client'

import { useEffect, useState } from 'react';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  isFavourite?: boolean;
}
import SearchBox from './components/SearchBox';
import RecipeCard from './components/RecipeCard';

export default function HomePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteMeals');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    const fetchInitialRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        const data = await response.json();
        setMeals(data.meals || []);
      }
      catch (error) {
        console.log("failed to fetch recipes", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchInitialRecipes();
  }, [])
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (mealId: string) => {
    setFavorites((prev) =>
      prev.includes(mealId)
        ? prev.filter((id) => id !== mealId)
        : [...prev, mealId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Recipe Search App
          </span>
        </h1>

        <SearchBox onSearch={handleSearch} isLoading={isLoading} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals?.map((meal) => (
            <RecipeCard
            key={meal.idMeal}
            meal={{ ...meal, isFavourite: favorites.includes(meal.idMeal) }}
            onToggleFavorite={toggleFavorite}
          />
          
          ))}

        </div>

        {hasSearched && meals?.length === 0 && !isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No recipes found
          </div>
        )}
      </main>
    </div>
  );
}