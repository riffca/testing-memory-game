import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
import Cards from './Cards'
import { useSelector } from 'react-redux'

const Game = ({ location: { pathname } }) => {

	if (pathname !== '/') {
		return null;
	}

	const timeout = useSelector(state=>state.cards.countDown)

	return (
		<PageLayout title="Memory Game">
				<div className="wrap-cards">
					<Cards />
					{ timeout !== 0 ? <div className='timeout'>
						<span className="timeout__number">{timeout}</span>
					</div> : null } 
				</div> 
		</PageLayout>
	);
};

Game.propTypes = {
	location: PropTypes.object.isRequired,
};

export default Game;
