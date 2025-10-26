import Link from "next/link";

function Navbar() {
	return (
		<div className="flex flex-row gap-8 items-center justify-center p-8 text-xl font-bold print:hidden">
			<Link href="/">Home</Link>
			<Link href="/browse">Browse</Link>
		</div>
	);
}

export default Navbar;
