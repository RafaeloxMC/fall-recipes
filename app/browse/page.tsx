"use client";
import { useEffect, useState } from "react";
import RecipeCard, { IRecipeCard } from "../components/recipe-card";

function BrowsePage() {
	const [recipes, setRecipes] = useState<IRecipeCard[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchRecipes = async () => {
			const res = await fetch("/api/recipes/all");
			const body = await res.json();
			console.log(body);
			setRecipes(body.recipes);
		};

		fetchRecipes();
	}, []);

	return (
		<div className="flex flex-col p-8">
			<h1 className="text-4xl font-bold w-full text-center">
				Browse Recipes
			</h1>

			<input
				placeholder="Enter Search Term..."
				className="justify-center items-center p-4 m-12 bg-(--primary) rounded-2xl"
				onChange={(e) => {
					setSearchTerm(e.currentTarget.value);
				}}
			/>

			<div className="flex flex-wrap gap-8 items-center justify-center">
				{recipes.map((card, index) => {
					if (
						card.content
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					)
						return (
							<RecipeCard
								_id={card._id}
								name={card.name.replace("# ", "")}
								content={(() => {
									const lines = (
										card.content ?? "b\na"
									).split("\n");
									const line = lines[1] ?? lines[0] ?? "";
									return line.replace(/\*/g, "");
								})()}
								key={card.name + "-" + index}
							/>
						);
				})}
			</div>
		</div>
	);
}

export default BrowsePage;
