"use client";
import MarkdownDisplay from "@/app/components/md-display";
import { IRecipe } from "@/app/db/schemas/Recipe";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

function Page({ params }: PageProps) {
	const { id } = React.use(params);
	const [recipe, setRecipe] = useState<IRecipe | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let mounted = true;
		async function load() {
			try {
				const res = await fetch(`/api/recipes/${id}`);
				if (!res.ok) throw new Error("Failed to fetch recipe");
				const data = await res.json();
				if (mounted) {
					setRecipe(data.recipe);
					setLoading(false);
				}
			} catch (e) {
				console.error(e);
				if (mounted) {
					setError("Failed to load recipe");
					setLoading(false);
				}
			}
		}
		if (id) load();
		return () => {
			mounted = false;
		};
	}, [id]);

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-8">
				<div className="animate-pulse text-2xl font-bold">
					Loading recipe...
				</div>
			</div>
		);
	}

	if (error || !recipe) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-8 gap-4">
				<div className="text-2xl font-bold text-red-400">
					{error || "Recipe not found"}
				</div>
				<Link
					href="/"
					className="px-6 py-3 bg-(--primary) border border-(--primary-border) rounded-xl hover:bg-(--primary-border) transition-colors"
				>
					Back to Home
				</Link>
			</div>
		);
	}

	const handleDownload = () => {
		try {
			const blob = new Blob([recipe.content], {
				type: "text/markdown;charset=utf-8",
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${recipe.name
				.replace(/[^a-z0-9]/gi, "-")
				.toLowerCase()}.md`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
		} catch (e) {
			console.error("Download failed:", e);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center not-print:p-8">
			<div className="w-full max-w-4xl">
				<div className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4 print:hidden"
					>
						<span>←</span>
						<span>Back to Generator</span>
					</Link>
					<h1 className="text-5xl font-extrabold mb-2">
						Fall Recipe
					</h1>
					<p className="text-sm italic opacity-80">
						Created on{" "}
						{new Date(recipe.createdAt).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "long",
								day: "numeric",
							}
						)}
					</p>
				</div>

				<div className="bg-(--primary) border border-(--primary-border) rounded-lg p-8 mb-6">
					<MarkdownDisplay content={recipe.content} />
				</div>

				<div className="flex flex-row gap-4 print:hidden">
					<button
						className="flex-1 px-6 py-4 bg-(--primary) border border-(--primary-border) rounded-xl hover:bg-(--primary-border) transition-colors font-semibold"
						onClick={handleDownload}
					>
						Download Recipe
					</button>
					<button
						className="flex-1 px-6 py-4 bg-(--primary) border border-(--primary-border) rounded-xl hover:bg-(--primary-border) transition-colors font-semibold"
						onClick={() => window.print()}
					>
						Print Recipe
					</button>
				</div>
			</div>
		</div>
	);
}

export default Page;
