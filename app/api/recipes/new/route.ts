import { connectDB } from "@/app/db/db";
import Recipe from "@/app/db/schemas/Recipe";
import { recipeCache } from "@/app/util/recipeCache";
import { NextRequest, NextResponse } from "next/server";

interface INewExpectedBody {
	content: string;
	createdAt: number;
}

export async function POST(req: NextRequest) {
	let body: INewExpectedBody;
	try {
		body = await req.json();

		if (!body.content || !body.createdAt) {
			return NextResponse.json(
				{ message: "Bad request" },
				{ status: 400 }
			);
		}
	} catch {
		return NextResponse.json({ message: "Bad request" }, { status: 400 });
	}

	const recipeExists = recipeCache.some(
		(recipe) =>
			recipe.content === body.content &&
			recipe.createdAt === body.createdAt
	);

	if (!recipeExists) {
		console.log("RECIPE NOT FOUND! RECIPECACHE: ", recipeCache);
		return NextResponse.json(
			{ message: "Recipe has not been generated yet" },
			{ status: 400 }
		);
	}
	await connectDB();

	for (let i = recipeCache.length - 1; i >= 0; i--) {
		const r = recipeCache[i];
		if (r.content === body.content && r.createdAt === body.createdAt) {
			recipeCache.splice(i, 1);
		}
	}

	const recipe = await Recipe.create({
		name: body.content.split("\n")[0],
		content: body.content,
		createdAt: body.createdAt,
	});

	if (recipe) {
		return NextResponse.json(
			{ message: recipe._id.toString() },
			{ status: 201 }
		);
	} else {
		return NextResponse.json(
			{ message: "Failed to create recipe" },
			{ status: 500 }
		);
	}
}
