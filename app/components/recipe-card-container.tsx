import { Types } from "mongoose";
import RecipeCard, { IRecipeCard } from "./recipe-card";

interface RecipeCardContainerProps {
	cards: IRecipeCard[];
}

function RecipeCardContainer({ cards }: RecipeCardContainerProps) {
	const filledCards = [...cards];
	const placeholder = {
		name: "N/A",
		content: "N/A",
		_id: new Types.ObjectId("000000000000000000000000"),
	};

	while (filledCards.length < 5) {
		filledCards.push(filledCards.at(0) ?? placeholder);
	}

	const duplicatedCards = [...filledCards, ...filledCards, ...filledCards];

	return (
		<div className="relative overflow-hidden w-full">
			<div className="flex flex-row gap-4 animate-scroll hover:pause will-change-transform">
				{duplicatedCards.map((card, index) => {
					return (
						<RecipeCard
							name={card.name.replace("# ", "")}
							content={(() => {
								const lines = (card.content ?? "b\na").split(
									"\n"
								);
								const line = lines[1] ?? lines[0] ?? "";
								return line.replace(/\*/g, "");
							})()}
							_id={card._id}
							key={`${card.name}-${index}`}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RecipeCardContainer;
