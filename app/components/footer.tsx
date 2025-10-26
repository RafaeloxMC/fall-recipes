import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<div className="flex flex-col w-full items-center justify-center gap-4 print:hidden">
			<div className="flex flex-row justify-center items-center w-full gap-8">
				<div className="max-w-48">
					<p className="text-xl font-bold">Fall Recipes</p>{" "}
					<p>
						Use artificial intelligence to generate your fall
						recipes!
					</p>
				</div>
				<div className="w-px h-24 border border-(--primary-border)" />
				<div className="flex flex-col">
					<p className="text-xl font-bold">Hyperlinks</p>
					<div className="flex flex-row gap-4">
						<Link href="/">Home</Link>
						<Link href="/browse">Browse</Link>
					</div>
				</div>
			</div>
			<Link href={"https://xvcf.dev"}>Made with ❤️ by @xvcf</Link>
		</div>
	);
}

export default Footer;
