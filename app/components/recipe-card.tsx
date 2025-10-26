import Image from "next/image";

function RecipeCard() {
	return (
		<div className="max-w-72 w-full h-96 rounded-xl overflow-hidden">
			<div className="relative w-full h-48">
				<Image
					className="object-cover"
					src="/recipe.jpg"
					alt={"Recipe Picture"}
					fill
				/>
			</div>
			<div className="p-4 bg-(--primary) rounded h-full">
				<h1 className="text-2xl font-extrabold">Some nice recipe!</h1>
				<p className="text-sm italic">
					This is a very nice recipe! You should really make this
					yourself!
				</p>
			</div>
		</div>
	);
}

export default RecipeCard;
