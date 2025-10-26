import { Types } from "mongoose";
import Image from "next/image";
import Link from "next/link";

export interface IRecipeCard {
	name: string;
	content: string;
	_id: Types.ObjectId;
}

function RecipeCard({ name, content, _id }: IRecipeCard) {
	return (
		<Link
			href={"/recipes/" + _id.toString()}
			className="w-72 h-96 rounded-xl overflow-hidden shrink-0"
		>
			<div className="relative w-full h-48">
				{_id ? (
					<Image
						className="object-cover"
						src="/recipe.jpg"
						alt={"Recipe Picture"}
						fill
					/>
				) : (
					<div></div>
				)}
			</div>
			<div className="p-4 bg-(--primary) rounded h-full">
				<h1 className="text-2xl font-extrabold">
					{name ?? "Some nice recipe!"}
				</h1>
				<p className="text-sm italic">
					{content ??
						"This is a very nice recipe! You should really make this yourself!"}
				</p>
			</div>
		</Link>
	);
}

export default RecipeCard;
