

import Image from "next/image";

interface RecipeDetail {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strYoutube: string;
    strTags: string;
    [key: string]: string;
}

interface RecipeResponse {
    meals: RecipeDetail[];
}

interface PageProps {
    params: {
        id: string;
    };
}

export default async function RecipePage({ params }: PageProps) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`
    );
    if (!response.ok) {
        throw new Error("failed to fetch recipes");
    }
    const data: RecipeResponse = await response.json();
    const recipe = data.meals[0];
    const ingredients = Object.keys(recipe)
        .filter((key) => key.startsWith("strIngredient") && recipe[key])
        .map((key, index) => ({
            ingredient: recipe[key],
            measure: recipe[`strMeasure${index + 1}`],
        }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <div className="relative h-96 md:h-full">
                                <Image
                                    src={recipe.strMealThumb}
                                    alt={recipe.strMeal}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                                {recipe.strMeal}
                            </h1>

                            <div className="flex gap-4 mb-6">
                                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm">
                                    {recipe.strCategory}
                                </span>
                                <span className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                                    {recipe.strArea}
                                </span>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Ingredients
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {ingredients.map(({ ingredient, measure }, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-600 dark:text-gray-300 flex items-center gap-2"
                                        >
                                            <span className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0" />
                                            {measure} {ingredient}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                                    Instructions
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {recipe.strInstructions}
                                </p>
                            </div>

                            {recipe.strYoutube && (
                                <a
                                    href={recipe.strYoutube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Watch on YouTube
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}