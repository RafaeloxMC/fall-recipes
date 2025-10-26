import { IRecipe } from "../db/schemas/Recipe";

declare global {
	var recipeCache: IRecipe[] | undefined;
}

if (!global.recipeCache) {
	global.recipeCache = [];
}

export const recipeCache = global.recipeCache;
