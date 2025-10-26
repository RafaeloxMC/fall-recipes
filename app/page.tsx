"use client";
import { useEffect, useState } from "react";
import { IRecipeCard } from "./components/recipe-card";
import RecipeCardContainer from "./components/recipe-card-container";
import RecipeGenerator from "./components/recipe-generator";

export default function Home() {
	const [recipes, setRecipes] = useState<IRecipeCard[]>([]);

	useEffect(() => {
		const fetchRecipes = async () => {
			const res = await fetch("/api/recipes/random");
			const body = await res.json();
			console.log(body);
			setRecipes(body.recipes);
		};

		fetchRecipes();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center w-full p-8">
			<h1 className="text-[100px] font-extrabold">
				Fall recipe generator!
			</h1>
			<p className="italic mt-4">
				The fall recipe generator is your go-to website for cozy,
				seasonal recipes — think warm spices, roasted vegetables, and
				comforting desserts.
			</p>
			<p className="mt-2 text-sm">
				Explore creative ideas, customize servings and dietary
				preferences, and get inspired for weeknight dinners or holiday
				gatherings.
			</p>
			<p className="mt-2 text-sm">
				Try it out below and list ingredients or instruction to suit
				your taste.
			</p>

			<div className="w-16 bg-transparent h-8" />
			<RecipeCardContainer cards={recipes} />
			<RecipeGenerator />
		</div>
	);
}
