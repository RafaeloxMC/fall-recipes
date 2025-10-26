import { connectDB } from "@/app/db/db";
import Recipe from "@/app/db/schemas/Recipe";
import { NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const recipes = await Recipe.find();

	return NextResponse.json(
		{ recipes, count: recipes.length },
		{ status: 200 }
	);
}
