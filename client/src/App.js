import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage';
import { CreateStory } from './pages/CreateStory';
import { ReadStory } from './pages/ReadStory';
import './App.css';
import { CategoryPage } from './pages/CategoryPage';
import { UpdatePage } from './pages/UpdatePage';
import { Scrollbars } from 'react-custom-scrollbars-2';

function App() {
	return (
		<Scrollbars
			style={{
				height: '100vh',
			}}
			renderThumbVertical={({ style, ...props }) => (
				<div
					{...props}
					style={{
						...style,
						backgroundColor: '#ff6363',
						width: '4px',
						opacity: '0.7',
					}}
				/>
			)}
		>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/story/new">
						<CreateStory />
					</Route>
					<Route path="/story/:uniqueName/edit">
						<UpdatePage />
					</Route>
					<Route path="/story/:id">
						<ReadStory />
					</Route>
					<Route path="/category/:category">
						<CategoryPage />
					</Route>
					<Route exact path="/">
						<HomePage />
					</Route>
				</Switch>
			</Router>
		</Scrollbars>
	);
}

export default App;
