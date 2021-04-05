import {useRouter} from 'next/router';
import EventList from '../../components/events/event-list';
import React, {Fragment, useEffect, useState} from 'react';
import useSWR from 'swr';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import Head from 'next/head';

function FilteredEventsPage (props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const {
		data,
		error
	} = useSWR('https://nextjs-course-mx-default-rtdb.firebaseio.com/events.json');

	useEffect(() => {
		if ( data ) {
			const events = [];

			for ( const key in data ) {
				events.push({
					id: key,
					...data[key]
				});
			}
			setLoadedEvents(events);
		}
	}, [data]);

	let pageHeadData=(
		 <Head>
			 <title>Filtered events</title>
			 <meta
					name={'description'}
					content={`a list`} />
		 </Head>
	);

	if ( !loadedEvents ) {
		return (
			 <Fragment>
				 {pageHeadData}
				 <p className={'center'}>loading...</p>
			 </Fragment>
		);
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	pageHeadData = (
		 <Head>
			 <title>Filtered events</title>
			 <meta
					name={'description'}
					content={`All events for ${numMonth}/${numYear}`} />
		 </Head>
	);
	if ( isNaN(numYear) ||
		 isNaN(numMonth) ||
		 numYear > 2030 ||
		 numYear < 2021 ||
		 numMonth < 1 ||
		 numMonth > 12 ||
		 error ) {
		return (
			 <Fragment>
				 {pageHeadData}
				 <ErrorAlert>
					 <p>Invalid filter. please adjust your values</p>
				 </ErrorAlert>
				 <div className={'center'}>
					 <Button link={'/events'}>show all events</Button>
				 </div>
			 </Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate.getFullYear() === numYear &&
			 eventDate.getMonth() === numMonth - 1;
	});

	if ( !filteredEvents || filteredEvents.length === 0 ) {
		return (
			 <Fragment>
				 {pageHeadData}
				 <ErrorAlert>
					 <p>no events found for the chosen filter</p>
				 </ErrorAlert>

				 <div className={'center'}>
					 <Button link={'/events'}>show all events</Button>
				 </div>
			 </Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		 <Fragment>
			 {pageHeadData}
			 <ResultsTitle date={date} />
			 <EventList items={filteredEvents} />
		 </Fragment>
	);
}

//
// export async function getServerSideProps (context) {
// 	const {params} = context;
//
// 	const filterData = params.slug;
//
// 	const filteredYear = filterData[0];
// 	const filteredMonth = filterData[1];
//
// 	const numYear = +filteredYear;
// 	const numMonth = +filteredMonth;
//
// 	if ( isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 ) {
// 		return {
// 			props: {hasError: true}
// 			// notFound: true,
// 			// redirect:{
// 			// 	destination:'/error'
// 			// }
// 		};
// 	}
//
// 	//   const filteredEvents = await getFilteredEvents({
// //     year: numYear,
// //     month: numMonth,
// //   });
//
// //   return {
// //     props: {
// //       events: filteredEvents,
// //       date: {
// //         year: numYear,
// //         month: numMonth,
// //       },
// //     },
// //   };
//
// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth
// 	});
//
// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth
// 			}
// 		}
// 	};
// }

export default FilteredEventsPage;