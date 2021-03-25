import React from 'react';
import Link from 'next/link';
import classes from './main-header.module.css'

function MainHeader (props) {
	return (
		 <header className={classes.header}>
			 <div className={classes.logo}>
				 <Link href={'/'}>
					 Events with Karyna
				 </Link>
			 </div>
			 <nav className={classes.navigation}>
				 <ul>
					 <li>
						 <Link href={'/events'}>browse all events</Link>
					 </li>
				 </ul>
			 </nav>
		 </header>
	);
}

export default MainHeader;