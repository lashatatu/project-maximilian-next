import EventList from '../components/events/event-list';
import {getFeaturedEvents} from '../helpers/api-utils';

function MainPage (props) {

	return (
		 <div>
			 <EventList items={props.events}/>
		 </div>
	);
}

export async function getStaticProps(context){
	const featuredEvents=await getFeaturedEvents();
	return {
		props:{
			events:featuredEvents
		}
	}
}

export default MainPage;