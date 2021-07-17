import React, { useState, useEffect } from 'react';
import {
	makeStyles,
	Grid,
	Typography,
	Link,
	Chip,
	Icon,
	Divider,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';
import { CustomThemeContext } from '../context/CustomThemeProvider';

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
	tags2: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
		justifyContent: 'center',
		textAlign: 'center',
		marginBottom: '10px',
	},
}));

export const HomePage = ({ setLoading }) => {
	const classes = useStyles();
	const { currentTheme } = React.useContext(CustomThemeContext);
	const [stories, setStories] = useState([]);
	const techTags = [
		'Adobe',
		'Atlassian',
		'Apple',
		'Google',
		'Flipkart',
		'Microsoft',
	];

	const coreTags = [
		'ExxonMobil',
		'Silicon Labs',
		'Micron',
		'NVIDIA',
		'Analog Devices',
	];
	const businessTags = ['Bain & Company'];
	const productTags = [
		'CRED',
		'Trell',
		'FamPay',
		'Groww',
		'LazyPay',
		'OLX',
		'QuickRide',
	];

	const financeTags = [
		'JP Morgan',
		'Goldman Sachs',
		'Credit Suisse',
		'Nomura',
	];

	const researchTags = [
		'Caltech',
		'MITACS',
		'University of British Columbia',
	];

	useEffect(() => {
		axios.get('/api/story').then((res) => {
			console.log(res.data);
			setStories(res.data);
			setLoading(false);
		});
	}, []);

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				<Grid container direction="row" justify="center" spacing={4}>
					<Grid item xs={12} style={{ marginBottom: '20px' }}>
						<Grid container direction="row" justify="center">
							<img
								alt="logo"
								src={
									currentTheme === 'light'
										? 'light.png'
										: 'dark.png'
								}
								style={{ width: '50%', minWidth: '250px' }}
							/>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/tech" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-laptop-code"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Tech
										</Typography>
										<div className={classes.tags2}>
											{techTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/tech' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/core" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-cogs"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Core
										</Typography>
										<div className={classes.tags2}>
											{coreTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/core' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/product" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-tasks"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Product
										</Typography>
										<div className={classes.tags2}>
											{productTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/product' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/finance" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-percentage"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Finance
										</Typography>
										<div className={classes.tags2}>
											{financeTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/finance' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/research" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-flask"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Research
										</Typography>
										<div className={classes.tags2}>
											{researchTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/research' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Link href="/category/business" underline="none">
							<Card>
								<CardActionArea>
									<CardContent>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											align="center"
											color="primary"
											style={{
												display: 'flex',
												alignItems: 'center',
												flexWrap: 'wrap',
												justifyContent: 'center',
											}}
										>
											<Icon
												className="fas fa-chart-line"
												color="primary"
												style={{
													marginRight: '10px',
													width: '30px',
												}}
												fontSize="default"
											></Icon>
											Business
										</Typography>
										<div className={classes.tags2}>
											{businessTags.map((tag) => (
												<Link
													underline="none"
													href={
														'/category/business' +
														'?search=' +
														tag
													}
												>
													<Chip
														label={tag}
														color="secondary"
														variant="outlined"
														clickable
														style={{
															fontSize: '12px',
														}}
													/>
												</Link>
											))}
										</div>
									</CardContent>
								</CardActionArea>
							</Card>
						</Link>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Divider
					variant="middle"
					style={{
						marginTop: '40px',
						marginBottom: '20px',
					}}
				/>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="h4">Latest Stories</Typography>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={4}
					style={{ marginTop: '20px' }}
				>
					{stories.map((story) => (
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
																	story.category +
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
										</CardContent>
									</CardActionArea>
								</Card>
							</Link>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>

		/* {stories.map((story) => (
				<Link underline="none" href={'/story/' + story.id}>
					<Card raised={true} style={{ marginTop: '20px' }}>
						<CardActionArea>
							<CardContent>
								<Typography
									gutterBottom
									variant="h6"
									component="h3"
								>
									{story.title}
								</Typography>
								<Typography
									variant="body1"
									color="textSecondary"
									component="p"
								>
									{story.body}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Link>
			))} */
	);
};
