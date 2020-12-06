import React from 'react';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd'

import './PageLayout.less';

const { Content } = Layout;

const PageLayout = ({ title, children, onBack }) => {
	const timer = useSelector(state=>state.cards.timer)
	const softGame = useSelector(state=>state.cards.softGame)
	const gameIsActive = useSelector(state=>state.cards.gameActive)
	const location = useLocation()
	const dispatch = useDispatch()
	return (
		<React.Fragment>
			<PageHeader 
				onBack={onBack ? onBack : false} 
				title={title} 

				tags={ 
					location.pathname !== '/statistics' ? <Link key={"1"} to="/statistics">Statistics</Link> : null

					} 
				extra={[
					gameIsActive ? <div key={'1'} className='timeout'>,
						<span className="timeout__number">{timer}</span>
						</div> : null,
						<Button type="primary" onClick={()=>dispatch({type: 'SET_GAME_LEVEL'})} key={"2"}>{softGame ? 'Soft' : 'Long' } Game</Button>,
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
