import './Statistics.less';
import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { useHistory } from "react-router-dom";

import { formatDate } from '@/utils';



const Statistics = () => {
	const history = useHistory();

	let results = JSON.parse(localStorage.getItem('card-results')).sort((a,b)=>b.date-a.date)

	const renderCards =	results.map((item,index)=><div key={index} className="statistics__item">
			<div>Date:<span className="statistics__number">{formatDate('MM/DD/YYYY, HH:mm:ss', item.date)}</span></div>
			<div>Time:<span className="statistics__number">{item.timer}s</span></div>
		</div>
	)
	return (
		<PageLayout className="statistics" title="Statistics" onBack={()=>history.push('/')}>
			<div>{renderCards}</div>
		</PageLayout>
	);
};

export default Statistics;
