import React from 'react'
import { useDispatch  } from 'react-redux'
import { setActiveCard } from '@/store/actions/cards'
const Card = ({card}) => {
	const dispatch = useDispatch() 
	return (
		<React.Fragment>
			{ !card.clear ? <div 
				className="cards__game-card" 
				onClick={()=>dispatch(setActiveCard(card))}>
				{!card.opened ? '?' : card.id}
			</div> : null }
		</React.Fragment>
	);

};

export default Card;
