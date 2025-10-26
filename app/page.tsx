import RecipeGenerator from "./components/recipe-generator";

export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center w-full p-8">
			<h1 className="text-4xl font-extrabold">Fall recipe generator!</h1>
			<p className="italic mt-4">
				The fall recipe generator is your go-to website for cozy,
				seasonal recipes — think warm spices, roasted vegetables, and
				comforting desserts.
			</p>
			<p className="mt-2 text-sm">
				Explore creative ideas, customize servings and dietary
				preferences, and get inspired for weeknight dinners or holiday
				gatherings.
			</p>
			<p className="mt-2 text-sm">
				Try it out below and list ingredients or instruction to suit
				your taste.
			</p>
			<RecipeGenerator />
		</div>
	);
}
