import { Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
var randomColor = require('randomcolor');

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(4),
		paddingLeft: '15%',
		paddingRight: '15%',
	},
}));

const data = {
	labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'#445445',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
			],
			borderWidth: 1,
		},
	],
};

const Metrics = ({ setLoading }) => {
	const [users, setUsers] = useState(0);
	const [category, setCategory] = useState({});
	const [story, setStory] = useState({});
	const [search, setSearch] = useState({});
	const classes = useStyles();

	useEffect(() => {
		setLoading(false);
		axios.get('/api/story/metrics').then((res) => {
			const newCategory = {
				labels: [],
				datasets: [
					{
						label: 'Categories',
						data: [],
						backgroundColor: [],
						borderWidth: 1,
					},
				],
			};
			const newStory = {
				labels: [],
				datasets: [
					{
						label: 'Stories',
						data: [],
						backgroundColor: [],
						borderWidth: 1,
					},
				],
			};
			const newSearch = {
				labels: [],
				datasets: [
					{
						label: 'Searches',
						data: [],
						backgroundColor: [],
						borderWidth: 1,
					},
				],
			};
			res.data.forEach((data) => {
				if (typeof data.name === 'string' && data.name === '/newUser') {
					setUsers(data.count);
				} else if (
					typeof data.name === 'string' &&
					data.name.includes('/category')
				) {
					newCategory.labels.push(
						data.name.replace('/category/', '')
					);
					newCategory.datasets[0].data.push(data.count);
					newCategory.datasets[0].backgroundColor.push(
						randomColor({ luminosity: 'light' })
					);
				} else if (
					typeof data.name === 'string' &&
					data.name.includes('/story')
				) {
					newStory.labels.push(data.name.replace('/story/', ''));
					newStory.datasets[0].data.push(data.count);
					newStory.datasets[0].backgroundColor.push(
						randomColor({ luminosity: 'light' })
					);
				} else if (
					typeof data.name === 'string' &&
					data.name.includes('/search')
				) {
					newSearch.labels.push(data.name.replace('/search/', ''));
					newSearch.datasets[0].data.push(data.count);
					newSearch.datasets[0].backgroundColor.push(
						randomColor({ luminosity: 'light' })
					);
				}
			});
			setCategory(newCategory);
			setStory(newStory);
			setSearch(newSearch);
		});
	}, []);
	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				<Grid container direction="row" justify="center" spacing={4}>
					<Grid item xs={12} style={{ marginBottom: '20px' }}>
						<Grid container direction="row" justify="center">
							<Typography variant="h4">
								We Have{' '}
								<Typography
									variant="h4"
									component="span"
									color="primary"
								>
									{users}
								</Typography>{' '}
								Users Onboard!
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} style={{ marginBottom: '150px' }}>
						<Grid
							container
							direction="row"
							justify="center"
							style={{ height: '50vh' }}
						>
							<Typography
								variant="h4"
								color="secondary"
								style={{ marginBottom: '20px' }}
							>
								Categories
							</Typography>
							<Doughnut
								data={category}
								options={{
									responsive: true,
									maintainAspectRatio: false,
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: '200px' }}>
					<Grid
						container
						direction="row"
						justify="center"
						style={{ height: '90vh' }}
					>
						<Typography
							variant="h4"
							color="secondary"
							component="h4"
							style={{
								marginBottom: '20px',
								width: '100%',
								textAlign: 'center',
							}}
						>
							Stories
						</Typography>
						<Typography
							variant="h5"
							color="primary"
							component="h5"
							style={{ marginBottom: '20px' }}
						>
							{story.datasets &&
								'Total Articles Read - ' +
									story.datasets[0].data
										.reduce((a, b) => a + b, 0)
										.toString()}
						</Typography>
						<Doughnut
							data={story}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ marginBottom: '100px' }}>
					<Grid
						container
						direction="row"
						justify="center"
						style={{ height: '90vh' }}
					>
						<Typography
							variant="h4"
							color="secondary"
							style={{
								marginBottom: '20px',
								width: '100%',
								textAlign: 'center',
							}}
						>
							Searches
						</Typography>
						<Typography
							variant="h5"
							color="primary"
							style={{ marginBottom: '20px' }}
						>
							{search.datasets &&
								'Total Searches - ' +
									search.datasets[0].data
										.reduce((a, b) => a + b, 0)
										.toString()}
						</Typography>
						<Doughnut
							data={search}
							options={{
								responsive: true,
								maintainAspectRatio: false,
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Metrics;
