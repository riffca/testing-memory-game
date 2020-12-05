import './Statistics.less';
import React from 'react';
import { useSelector } from 'react-redux'
import PageLayout from '../../layout/PageLayout';
import { useHistory } from "react-router-dom";
const Statistics = () => {
	const history = useHistory();
	const cards = useSelector(state=>state.cards.cards)

	let uniq = [...new Set(cards.map(item=>item.id+"-"+item.finished))]

	const renderCards =	uniq.map((item,index)=><div key={index} className="statistics__item">
			<div>Card:<span className="statistics__number">{item.split('-')[0]}</span></div>
			<div>Time:<span className="statistics__number">{item.split('-')[1] || '?' } s</span></div>
		</div>
	)
	return (
		<PageLayout className="statistics" title="Statistics" onBack={()=>history.push('/')}>
			<div>{renderCards}</div>
		</PageLayout>
	);
};

export default Statistics;
