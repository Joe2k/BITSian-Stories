import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import { makeStyles, Button, Grid, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
		marginLeft: '12%',
		marginRight: '12%',
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
		<div className={classes.root}>
			<Typography variant="h2" component="h2">
				Stories
			</Typography>
			{stories.map((story) => (
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
			))}
		</div>
	);
};
