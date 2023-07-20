import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-div-container'>
			<div className='left-nav-div'>
				<div className='home-link'>
					<NavLink exact to="/">Home</NavLink>
				</div>
				{sessionUser&&<div className='library'>
					<NavLink exact to="/folders">Library</NavLink>
				</div>}
				<div className='recent-folders'>
					<NavLink to="/folders/recent">Recent Folders</NavLink>
				</div>
				<div className='recent-sets'>
					<NavLink to="/sets/recent">Recent Sets</NavLink>
				</div>
			</div>
			{isLoaded && (
				<div className='user-links'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;