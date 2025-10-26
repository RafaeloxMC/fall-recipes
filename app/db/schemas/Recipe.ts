import mongoose, { Model, model, Schema } from "mongoose";

export interface IRecipe {
	name: string;
	content: string;
	createdAt: number;
}

const RecipeSchema = new Schema<IRecipe>({
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

export default ((mongoose.models &&
	mongoose.models.recipe) as Model<IRecipe>) ||
	(model<IRecipe>("recipe", RecipeSchema) as Model<IRecipe>);
