import { connect, Mongoose } from "mongoose";

let conn: Mongoose;

export async function connectDB() {
	const connUrl = process.env.MONGO_URI;
	if (!connUrl) {
		throw Error("No Mongo URI defined!");
	}

	if (!conn) conn = await connect(connUrl);
}
