import React from 'react';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd'

import './PageLayout.less';

const { Content } = Layout;

const PageLayout = ({ title, children, onBack }) => {
	const softGame = useSelector(state=>state.cards.softGame)
	const location = useLocation()
	const dispatch = useDispatch()
	return (
		<React.Fragment>
			<PageHeader 
				onBack={onBack ? onBack : false} 
				title={title} 
				tags={location.pathname !== '/statistics' ? <Link to="/statistics">Statistics</Link> : null} 
				extra={[
					<Button type="primary" onClick={()=>dispatch({type: 'SET_GAME_LEVEL'})} key="1">{softGame ? 'Soft' : 'Long' } Game</Button>
				]}/>
			<Content className="page-content">{children}</Content>
		</React.Fragment>
	);
};

PageLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};

export default PageLayout;
