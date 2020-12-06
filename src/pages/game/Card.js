import React from 'react'
import { useDispatch  } from 'react-redux'
import { setActiveCard } from '@/store/actions/cards'
import Icon from '@/components/icons/Icon'
const Card = ({card}) => {
	const dispatch = useDispatch() 
	return (
		<React.Fragment>
			{ !card.clear ? <div 
				className="cards__game-card" 
				onClick={()=>dispatch(setActiveCard(card))}>
				{!card.opened ? <Icon className="cards__game-card__svg" name="question" /> : card.id }
			</div> : null }
			
		</React.Fragment>
	);

};

export default Card;
