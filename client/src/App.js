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

function App() {
	return (
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
	);
}

export default App;
