
export async function getAllDocuments (client, collection, sort, filter = {}) {
	const documents = await db
		 .collection(collection)
		 .find(filter) // this changed - we use the "filter" parameter!
		 .sort(sort)
		 .toArray();
}
