import { connectDB } from "@/app/db/db";
import Recipe from "@/app/db/schemas/Recipe";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id } = await params;

	await connectDB();
	const recipe = await Recipe.findById(id);
	if (recipe) {
		return NextResponse.json({ recipe }, { status: 200 });
	} else {
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	}
}
