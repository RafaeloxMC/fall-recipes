"use client";
import { useState } from "react";
import { REGULATIONS } from "../util/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function RecipeGenerator() {
	const [ingredients, setIngredients] = useState("");
	const [regulations, setRegulations] = useState<REGULATIONS>(
		REGULATIONS.NO_REGULATIONS
	);
	const [recipe, setRecipe] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleGenerateRecipe = async () => {
		setRecipe(null);
		setError(null);

		try {
			const res = await fetch("/api/request", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					ingredients,
					regulations,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || data.error || "An error occurred");
				return;
			}

			if (data.success && data.message?.choices?.[0]?.message?.content) {
				const recipeContent = data.message.choices[0].message.content;
				setRecipe(recipeContent);
			} else {
				setError("Invalid response format");
			}
		} catch (err) {
			console.error("Request failed:", err);
			setError("Failed to generate recipe");
		}
	};
	return (
		<div className="p-4 flex flex-col justify-center items-center gap-4 w-full">
			<h1 className="text-4xl font-extrabold">Generate your recipe!</h1>

			<div className="w-full max-w-md flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<label htmlFor="ingredients" className="font-semibold">
						Ingredients
					</label>
					<input
						id="ingredients"
						type="text"
						value={ingredients}
						onChange={(e) => setIngredients(e.target.value)}
						placeholder="e.g., pumpkin, cinnamon, apple"
						className="px-4 py-2 bg-(--primary) rounded-lg border border-(--primary-border)"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="regulations" className="font-semibold">
						Dietary Regulations
					</label>
					<select
						id="regulations"
						value={regulations}
						onChange={(e) =>
							setRegulations(
								Number(e.target.value) as REGULATIONS
							)
						}
						className="px-4 py-2 bg-(--primary) rounded-lg border border-(--primary-border)"
					>
						<option value={REGULATIONS.NO_REGULATIONS}>
							No Restrictions
						</option>
						<option value={REGULATIONS.VEGAN}>Vegan</option>
						<option value={REGULATIONS.VEGETARIAN}>
							Vegetarian
						</option>
					</select>
				</div>

				<button
					onClick={handleGenerateRecipe}
					className="px-6 py-4 bg-(--primary) border border-(--primary-border) rounded-xl hover:bg-(--primary-border) transition-colors"
				>
					Generate Recipe
				</button>
			</div>

			{error && (
				<div className="w-full max-w-2xl p-4 bg-red-900/20 border border-red-700 rounded-lg">
					<p className="text-red-400">{error}</p>
				</div>
			)}

			{recipe && (
				<div className="w-full max-w-2xl">
					<RecipeDisplay content={recipe} />
				</div>
			)}
		</div>
	);
}

function RecipeDisplay({ content }: { content: string }) {
	return (
		<div className="bg-(--primary)  border border-(--primary-border)  rounded-lg p-6 prose prose-invert max-w-none">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	);
}

export default RecipeGenerator;
