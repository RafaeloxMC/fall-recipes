"use client";

import { useState } from "react";

export default function Home() {
	const [status, setStatus] = useState("");

	return (
		<div className="p-4 flex flex-col justify-center items-center">
			<h1 className="text-4xl font-extrabold">
				Example API Rate Limit Tester
			</h1>

			<p>Status: {status || "None"}</p>
			<button
				onClick={async () => {
					const res = await fetch("/api/request", { method: "POST" });
					setStatus(JSON.stringify(await res.json()));
				}}
				className="px-6 py-4 bg-neutral-700 rounded-xl"
			>
				Ratelimit API test
			</button>
		</div>
	);
}
