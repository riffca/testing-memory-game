import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import RouteWithSubRoutes from './RouteWithSubRoutes';

const Game = lazy(() => import('pages/game/Game'));
const Statistics = lazy(() => import('pages/statistics/Statistics'));

const routes = [
	{
		path: '/',
		component: Game,
	},
	{
		path: '/statistics',
		component: Statistics,
	},

];

const AppRouter = () => {
	return (
		<Router>
			<MainLayout>
				<Suspense fallback={<div className="lazy-loading">Loading...</div>}>
					{routes.map((route, i) => (
						<RouteWithSubRoutes key={i} {...route} />
					))}
				</Suspense>
			</MainLayout>
		</Router>
	);
};

export default AppRouter;
