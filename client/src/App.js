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
import AboutUs from './pages/AboutUs';
import Metrics from './pages/Metrics';
import ReactGA from 'react-ga';
const TRACKING_ID = 'UA-221188085-1';
ReactGA.initialize(TRACKING_ID);

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#121212',
	},
}));

function App() {
	const [loading, setLoading] = React.useState(true);
	const classes = useStyles();

	React.useEffect(() => {
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', 'yes');
			axios.post('/api/story/newUser');
		}
	}, []);
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
					<Route exact path="/about">
						<AboutUs setLoading={setLoading} />
					</Route>
					<Route exact path="/metrics">
						<Metrics setLoading={setLoading} />
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
