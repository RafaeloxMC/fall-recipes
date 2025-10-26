import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			animation: {
				scroll: "scroll 30s linear infinite",
			},
			keyframes: {
				scroll: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-50%)" },
				},
			},
		},
	},
	plugins: [typography],
} satisfies Config;

export default config;
