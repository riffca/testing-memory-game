import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './MainLayout.less';

const { Footer } = Layout;


export default class MainLayout extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { children } = this.props;
		return (
			<Layout>
				<Layout>
					{children}
					<Footer>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/riffca/testing-memory-game"
						>
							GitHub
						</a>
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

MainLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
