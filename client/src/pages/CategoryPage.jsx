import React, { useState, useEffect } from 'react';
import {
	makeStyles,
	Grid,
	Typography,
	Link,
	Chip,
	CircularProgress,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import CategoryPageBreadcrumbs from '../components/Breadcrumbs/CategoryPageBreadcrumbs';
import SearchBar from 'material-ui-search-bar';
import ReactGA from 'react-ga';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(4),
		paddingLeft: '15%',
		paddingRight: '15%',
	},
	tags: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
		justifyContent: 'center',
		textAlign: 'center',
		marginBottom: '10px',
	},
	search: {
		width: '60%',

		[theme.breakpoints.down('md')]: {
			width: '80%',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
	},
}));

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const CategoryPage = ({ setLoading }) => {
	const classes = useStyles();
	const query = useQuery();

	const [stories, setStories] = useState([]);
	const [mainStories, setMainStories] = useState([]);
	const [search, setSearch] = useState('');
	const [localSearch, setLocalSearch] = useState('');
	const [fadeAccordion, setFadeAccordion] = React.useState(true);
	let { category } = useParams();

	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
		ReactGA.event({
			category: 'Category',
			action: 'Category Page',
			label: category.charAt(0).toUpperCase() + category.slice(1),
		});
		axios
			.get(
				'/api/story/category/' +
					category.charAt(0).toUpperCase() +
					category.slice(1)
			)
			.then((res) => {
				console.log(res.data);
				let data = res.data;
				data.forEach((d, i, arr) => {
					let tagSearch = '';
					d.tags.forEach((tag) => {
						tagSearch += tag.text.toLowerCase() + ' ';
					});
					arr[i].search = tagSearch + ' ' + d.title.toLowerCase();
				});
				setStories(res.data);
				setMainStories(res.data);
				const searchParam = query.get('search');
				if (searchParam) {
					setSearch(searchParam);
					setLocalSearch(searchParam);
					query.delete('search');
				}
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		setStories(
			mainStories.filter((d) => d.search.includes(search.toLowerCase()))
		);
		ReactGA.event({
			category: 'Search',
			action: 'Searched',
			label: search,
		});
		axios.post('/api/story/search/' + search);
	}, [search]);

	React.useEffect(() => {
		const delayTimeout = setTimeout(() => {
			setSearch(localSearch);
			setFadeAccordion(true);
		}, 1000);

		return () => clearTimeout(delayTimeout);
	}, [localSearch]);

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				<CategoryPageBreadcrumbs category={category} />
			</Grid>
			<Grid
				item
				xs={12}
				style={{
					marginBottom: '20px',
				}}
			>
				<Grid container direction="row" justify="center">
					<SearchBar
						className={classes.search}
						value={localSearch}
						onChange={(newValue) => {
							setFadeAccordion(false);
							setLocalSearch(newValue);
						}}
						onCancelSearch={() => {
							setFadeAccordion(false);
							setLocalSearch('');
						}}
					/>
				</Grid>
			</Grid>

			<Grid item xs={12}>
				<Grid container direction="row" justify="center" spacing={4}>
					{!fadeAccordion && (
						<CircularProgress style={{ marginTop: '10%' }} />
					)}

					{fadeAccordion &&
						stories.map((story) => (
							<Grid item xs={12} sm={6} md={4}>
								<Link
									underline="none"
									href={'/story/' + story.uniqueName}
								>
									<Card style={{ maxWidth: '300' }}>
										<CardActionArea>
											<CardMedia
												component="img"
												alt={story.title}
												image={story.profilePic}
												title={story.title}
											/>
											<CardContent>
												<Typography
													gutterBottom
													variant="h6"
													component="h2"
													align="center"
													style={{ marginBottom: 0 }}
												>
													{story.title}
												</Typography>
												<div className={classes.tags}>
													{story.tags &&
														story.tags
															.slice(
																0,
																Math.min(
																	3,
																	story.tags
																		.length
																)
															)
															.map((tag) => (
																<Link
																	underline="none"
																	href={
																		'/category/' +
																		category +
																		'?search=' +
																		tag.text
																	}
																>
																	<Chip
																		label={
																			tag.text
																		}
																		color="secondary"
																		variant="outlined"
																		clickable
																		style={{
																			fontSize:
																				'14px',
																		}}
																	/>
																</Link>
															))}
												</div>
												<Typography
													variant="body2"
													color="textSecondary"
													component="p"
												>
													{story.body}
												</Typography>
												<Typography
													variant="overline"
													color="textSecondary"
													component="p"
													align="right"
													style={{
														marginTop: '10px',
													}}
												>
													{story.stats.text}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Link>
							</Grid>
						))}
				</Grid>
			</Grid>
		</Grid>
	);
};
