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
import {
	Backdrop,
	CircularProgress,
	Fade,
	makeStyles,
} from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#121212',
	},
}));

function App() {
	const [loading, setLoading] = React.useState(true);
	const classes = useStyles();

	if (!localStorage.getItem('user')) {
		axios.post('/api/story/newUser');
		localStorage.setItem('user', 'yes');
	}

	// React.useEffect(() => {
	// 	window.addEventListener('load', () => {
	// 		setLoading(false);
	// 	});
	// }, []);
	return (
		<>
			<Fade in={loading}>
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="primary" />
				</Backdrop>
			</Fade>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/story/new">
						<CreateStory setLoading={setLoading} />
					</Route>
					<Route path="/story/:uniqueName/edit">
						<UpdatePage setLoading={setLoading} />
					</Route>
					<Route path="/story/:id">
						<ReadStory setLoading={setLoading} />
					</Route>
					<Route path="/category/:category">
						<CategoryPage setLoading={setLoading} />
					</Route>
					<Route exact path="/">
						<HomePage setLoading={setLoading} />
					</Route>
					<Route path="*">
						<Redirect to={{ pathname: '/' }} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
