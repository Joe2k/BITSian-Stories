import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Typography,
	Link,
	Chip,
	Icon,
	Divider,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';

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

export const HomePage = () => {
	const classes = useStyles();
	const [stories, setStories] = useState([]);
	const techTags = ['Adobe', 'Amazon', 'Apple', 'Google', 'GSoC', 'Nutanix'];

	useEffect(() => {
		axios.get('/api/story').then((res) => {
			console.log(res.data);
			setStories(res.data);
		});
	}, []);

	return (
		<Grid container className={classes.root}>
			<Grid item xs={12}>
				<Typography
					variant="h2"
					align="center"
					style={{ fontWeight: 'bold' }}
				>
					BITSian Stories
				</Typography>
				<Typography
					variant="body1"
					color="textSecondary"
					align="center"
					style={{
						fontSize: '20px',
						marginTop: '20px',
					}}
				>
					<p style={{ fontStyle: 'italic' }}>
						“Knowing is Not Enough, We must apply. Willing is not
						enough, we must do”
					</p>
					With this initiative, we aim to make career options and
					procedures more transparent for our students to make the
					most of them. Even the most talented people need to be aware
					of the options available for them.
				</Typography>
				<Grid
					container
					direction="row"
					justify="center"
					spacing={4}
					style={{ marginTop: '20px' }}
				>
					<Grid item xs={12} sm={6} md={4}>
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
													'/category/tech/' +
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
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
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
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Google | Apple | GSoC | CodeNation
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
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
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Get to know more about Finance companies
										and their work culture!
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
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
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										Get to know more about Research Roles
										and their work culture!
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
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
											height="250"
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
