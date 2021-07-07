import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Typography,
	Link,
	Chip,
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
}));

export const HomePage = () => {
	const classes = useStyles();
	const [stories, setStories] = useState([]);

	useEffect(() => {
		axios.get('/api/story').then((res) => {
			console.log(res.data);
			setStories(res.data);
		});
	}, []);

	return (
		<Grid container className={classes.root} spacing={2}>
			<Grid item xs={12}>
				<Grid container direction="row" justify="center" spacing={4}>
					{stories.map((story) => (
						<Grid item xs={12} sm={6} md={4}>
							<Link underline="none" href={'/story/' + story.id}>
								<Card style={{ maxWidth: '300' }}>
									<CardActionArea>
										<CardMedia
											component="img"
											alt="Contemplative Reptile"
											height="250"
											image={story.profilePic}
											title="Contemplative Reptile"
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
															<Chip
																label={tag.text}
																color="secondary"
																variant="outlined"
																clickable
																style={{
																	fontSize:
																		'14px',
																}}
															/>
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
