import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, number>();

setInterval(() => {
	const now = Date.now();
	for (const [key, timestamp] of rateLimitMap.entries()) {
		if (now - timestamp > 60000) {
			rateLimitMap.delete(key);
		}
	}
}, 5 * 60 * 1000);

function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return ip;
}

function isRateLimited(key: string): boolean {
	const lastRequestTime = rateLimitMap.get(key);
	const now = Date.now();

	if (!lastRequestTime) {
		rateLimitMap.set(key, now);
		return false;
	}

	const timeSinceLastRequest = now - lastRequestTime;

	if (timeSinceLastRequest < 60000) {
		return true;
	}

	rateLimitMap.set(key, now);
	return false;
}

export async function POST(request: NextRequest) {
	const rateLimitKey = getRateLimitKey(request);

	if (isRateLimited(rateLimitKey)) {
		const lastRequestTime = rateLimitMap.get(rateLimitKey)!;
		const timeRemaining = Math.ceil(
			(60000 - (Date.now() - lastRequestTime)) / 1000
		);

		return NextResponse.json(
			{
				error: "Rate limited",
				message: `Please wait ${timeRemaining} seconds before making another request`,
			},
			{
				status: 429,
				headers: {
					"Retry-After": timeRemaining.toString(),
				},
			}
		);
	}

	try {
		return NextResponse.json({
			success: true,
			message: "response from ai api here",
		});
	} catch (error) {
		console.error("API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
