export async function getAllEvents () {
	const response = await fetch('https://nextjs-course-mx-default-rtdb.firebaseio.com/events.json');
	const date = await response.json();

	const events = [];
	for ( const key in data ) {
		events.push({
			id: key,
			...date[key]
		});
	}

	return events;
}

export async function getFeaturedEvents () {
	const allEvents=await getAllEvents();
	return allEvents.filter((event) => event.isFeatured);
}