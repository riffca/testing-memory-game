import { useSelector } from 'react-redux';
import PageLayout from '@/layout/PageLayout';
import React from 'react'
import GameCard from './Card'

import './Cards.less'

const Cards = () => {

	const cards = useSelector(state=>state.cards.cards)

	const renderCards = cards.map((item,index)=>item.clear ? null : <GameCard card={item} key={index} />)

	return (
			<>
				<div className="cards">
					{renderCards}
				</div>

			</>
	);
};

export default Cards;
