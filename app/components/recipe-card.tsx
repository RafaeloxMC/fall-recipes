import { Types } from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface IRecipeCard {
	name: string;
	content: string;
	_id: Types.ObjectId;
}

function RecipeCard({ name, content, _id }: IRecipeCard) {
	const [imageError, setImageError] = useState(false);

	return (
		<Link
			href={"/recipes/" + _id.toString()}
			className="w-72 h-96 rounded-xl overflow-hidden shrink-0"
		>
			<div className="relative w-full h-48 bg-(--primary-border) flex items-center justify-center">
				{_id && !imageError ? (
					<Image
						className="object-cover"
						src={"/images/" + _id.toString() + ".jpg"}
						alt={"Recipe Picture"}
						fill
						onError={() => setImageError(true)}
					/>
				) : (
					<div className="text-8xl text-(--primary)">?</div>
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
