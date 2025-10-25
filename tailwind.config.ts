import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [typography],
} satisfies Config;

export default config;
