"use client";
import MarkdownDisplay from "@/app/components/md-display";
import { IRecipe } from "@/app/db/schemas/Recipe";
import React, { useState, useEffect } from "react";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

function Page({ params }: PageProps) {
	const { id } = React.use(params);
	const [recipe, setRecipe] = useState<IRecipe | null>(null);

	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				const res = await fetch(`/api/recipes/${id}`);
				if (!res.ok) throw new Error("Failed to fetch recipe");
				const data = await res.json();
				if (mounted) setRecipe(data.recipe);
			} catch (e) {
				console.error(e);
			}
		}
		if (id) load();
		return () => {
			mounted = false;
		};
	}, [id]);

	if (!recipe) return <div>Loading...</div>;

	return (
		<div className="flex flex-col p-4">
			<MarkdownDisplay content={recipe.content} />
		</div>
	);
}

export default Page;
