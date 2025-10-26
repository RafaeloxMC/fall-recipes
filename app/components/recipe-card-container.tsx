import RecipeCard, { IRecipeCard } from "./recipe-card";

interface RecipeCardContainerProps {
	cards: IRecipeCard[];
}

function RecipeCardContainer({ cards }: RecipeCardContainerProps) {
	while (cards.length < 5) {
		cards.push(cards.at(0) ?? { name: "N/A", content: "N/A" });
	}

	const duplicatedCards = [...cards, ...cards, ...cards];

	return (
		<div className="relative overflow-hidden w-full">
			<div className="flex flex-row gap-4 animate-scroll hover:pause will-change-transform">
				{duplicatedCards.map((card, index) => {
					return (
						<RecipeCard
							name={card.name}
							content={card.content}
							key={`${card.name}-${index}`}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RecipeCardContainer;
