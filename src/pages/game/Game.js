import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
import Cards from './Cards'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd';
const Game = ({ location: { pathname } }) => {

	if (pathname !== '/') {
		return null;
	}

	const timer = useSelector(state=>state.cards.timer)
	const gameIsActive = useSelector(state=>state.cards.gameActive)
	const dispatch = useDispatch()
	return (
		<PageLayout title="Memory Game">
				<div className="wrap-cards">
					<Cards />

						<div>
						{ !gameIsActive ? 
							<Button type="primary" onClick={()=>dispatch({type:'START_CARD_GAME'})}>
								Start Game
							</Button> : null }

						</div>

					{ gameIsActive ? <div className='timeout'>
						<span className="timeout__number">{timer}</span>
					</div> : null } 
				</div> 
		</PageLayout>
	);
};

Game.propTypes = {
	location: PropTypes.object.isRequired,
};

export default Game;
