import Image from 'next/image';
import Link from 'next/link';

interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    isFavourite?: boolean;
}

interface RecipeCardProps {
    meal: Meal;
    onToggleFavorite: (id: string) => void;
}

export default function RecipeCard({ meal, onToggleFavorite }: RecipeCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                      transform hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-64">
                <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {meal.strMeal}
                    </h2>
                    <button
                        onClick={() => onToggleFavorite(meal.idMeal)}
                        className="text-2xl hover:scale-110 transform transition-transform duration-200"
                        aria-label={meal.isFavourite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {meal.isFavourite ? '❤️' : '🤍'}
                    </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {meal.strInstructions}
                </p>
                <Link
                    href={`/recipe/${meal.idMeal}`}
                    className="inline-block bg-gradient-to-r from-blue-600 to-teal-500 text-white 
                     px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                    View Recipe
                </Link>
            </div>
        </div>
    );
}