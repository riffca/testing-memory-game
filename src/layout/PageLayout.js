import React from 'react';
import PropTypes from 'prop-types';
import { Layout, PageHeader } from 'antd';
import { Link, useLocation } from 'react-router-dom'

import './PageLayout.less';

const { Content } = Layout;

const PageLayout = ({ title, children, onBack }) => {
	const location = useLocation()
	return (
		<React.Fragment>
			<PageHeader onBack={onBack ? onBack : false} title={title} tags={location.pathname !== '/statistics' ? <Link to="/statistics">Statistics</Link> : null} />
			<Content className="page-content">{children}</Content>
		</React.Fragment>
	);
};

PageLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired,
};

export default PageLayout;
