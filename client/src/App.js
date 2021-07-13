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
		window.addEventListener('load', () => {
			setLoading(false);
		});
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
		</>
	);
}

export default App;
