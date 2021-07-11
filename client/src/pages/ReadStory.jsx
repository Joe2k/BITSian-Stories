import React, { useState, useEffect } from 'react';
import Dante, { darkTheme } from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Box,
	Link,
	IconButton,
	Icon,
	Chip,
	Avatar,
	Typography,
	withStyles,
	emphasize,
	CardMedia,
	CardActionArea,
	CardContent,
	Card,
	Divider,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import ConnectionButtons from '../components/ConnectionButtons/ConnectionButtons';
import ReadStoryBreadcrumbs from '../components/Breadcrumbs/ReadStoryBreadcrumbs';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(4),
		marginLeft: '12%',
		marginRight: '12%',
		flexGrow: 1,
	},
	img: {
		borderRadius: '50%',
		width: '75%',
	},
	imgBox: {
		height: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			textAlign: 'center',
		},
	},
	tags: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5),
		},
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			textAlign: 'center',
		},
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

export const ReadStory = () => {
	const classes = useStyles();
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');
	const [picture, setPicture] = useState();
	const [category, setCategory] = useState('');
	const [urls, setUrls] = useState({});
	const [tags, setTags] = useState([]);
	let { id } = useParams();
	const [recommendations, setRecommendations] = useState([]);

	useEffect(() => {
		axios.get(`/api/story/${id}`).then((res) => {
			console.log(res.data);
			setBody(res.data.body);
			setTitle(res.data.title);
			setPicture(res.data.profilePic);
			setCategory(res.data.category);
			setUrls(res.data.urls);
			setTags(res.data.tags);

			setRecommendations(res.data.recommendations);
			document.title = res.data.title.replace(/<[^>]+>/g, '');
		});
	}, []);
	return (
		<div className={classes.root}>
			<ReadStoryBreadcrumbs title={title} category={category} />
			<Grid container spacing={3} style={{ marginBottom: '30px' }}>
				<Grid item sm={4} xs={12}>
					{picture && (
						<Box alignItems="center" className={classes.imgBox}>
							<img
								className={classes.img}
								src={picture}
								alt={title.replace(/<[^>]+>/g, '')}
							/>
						</Box>
					)}
				</Grid>
				<Grid item sm={8} xs={12}>
					{title && (
						<Box alignItems="center" className={classes.imgBox}>
							<div>
								<Dante
									bodyPlaceholder={'A Catchy Title...'}
									content={title}
									widgets={[]}
									readOnly={true}
									style={{ flexGrow: 1 }}
								/>
								<Link
									underline="none"
									href={'/category/' + category}
								>
									<div>
										{category && (
											<h2 className="css-1p0umon graf graf--h">
												{category}
											</h2>
										)}
									</div>
								</Link>

								<div className={classes.tags}>
									{tags.map((tag) => (
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
												label={tag.text}
												color="secondary"
												variant="outlined"
												clickable
												style={{ fontSize: '16px' }}
											/>
										</Link>
									))}
								</div>

								<ConnectionButtons id={id} urls={urls} />
							</div>
						</Box>
					)}
				</Grid>
			</Grid>

			{body && (
				<Dante
					bodyPlaceholder={'Story goes here...'}
					content={body}
					widgets={[]}
					readOnly={true}
				/>
			)}
			<Divider
				variant="middle"
				style={{
					marginTop: '40px',
					marginBottom: '20px',
				}}
			/>

			<Grid container direction="row" justify="center" spacing={4}>
				{recommendations.length > 0 && (
					<Grid item xs={12}>
						<Typography variant="h4">
							{'More on ' + category}
						</Typography>
					</Grid>
				)}

				{recommendations.length > 0 &&
					recommendations.map((story) => (
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
											<div className={classes.tags2}>
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
		</div>
	);
};
