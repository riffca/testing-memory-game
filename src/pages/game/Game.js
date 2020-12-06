import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
import Cards from './Cards'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd';

import ICON from '@/components/icons/Icon'
const Game = ({ location: { pathname } }) => {

	if (pathname !== '/') {
		return null;
	}

	const gameIsActive = useSelector(state=>state.cards.gameActive)
	const dispatch = useDispatch()
	return (
		<PageLayout title="Memory Game">
				<div className="wrap-cards">

					{ !gameIsActive ? null : <Cards /> }

					<div>
					{ !gameIsActive ? 
						<Button type="primary" onClick={()=>dispatch({type:'START_CARD_GAME'})}>
							Start
						</Button> : null }

					</div>

				</div> 
		</PageLayout>
	);
};

Game.propTypes = {
	location: PropTypes.object.isRequired,
};

export default Game;
