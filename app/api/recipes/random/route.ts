import { connectDB } from "@/app/db/db";
import Recipe from "@/app/db/schemas/Recipe";
import { NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const count = await Recipe.countDocuments();

	const limit = Math.min(count, 10);

	const recipes = await Recipe.aggregate([{ $sample: { size: limit } }]);

	return NextResponse.json(
		{ recipes, count: recipes.length },
		{ status: 200 }
	);
}
