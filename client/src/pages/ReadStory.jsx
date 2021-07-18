import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Box,
	Link,
	Chip,
	Typography,
	CardMedia,
	CardActionArea,
	CardContent,
	Card,
	Divider,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ConnectionButtons from '../components/ConnectionButtons/ConnectionButtons';
import ReadStoryBreadcrumbs from '../components/Breadcrumbs/ReadStoryBreadcrumbs';
import defaultTheme from '../themes/default';
import darkTheme from '../themes/dark';
import { CustomThemeContext } from '../context/CustomThemeProvider';
import Disqus from 'disqus-react';
const readingTime = require('reading-time');

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

export const ReadStory = ({ setLoading }) => {
	const classes = useStyles();
	const { currentTheme } = React.useContext(CustomThemeContext);
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');
	const [picture, setPicture] = useState();
	const [category, setCategory] = useState('');
	const [urls, setUrls] = useState({});
	const [tags, setTags] = useState([]);
	const [cgpa, setCgpa] = useState();
	let { id } = useParams();
	const [recommendations, setRecommendations] = useState([]);
	const [branch, setBranch] = useState('');
	const [error, setError] = useState('');
	const disqusShortname = 'bitsian-stories';
	const disqusConfig = {
		url: window.location.href,
		identifier: id,
		title: title.replace(/<[^>]+>/g, ''),
	};
	const [stats, setStats] = useState({});

	useEffect(() => {
		axios
			.get(`/api/story/${id}`)
			.then((res) => {
				console.log(res.data);
				setBody(res.data.body);
				setTitle(res.data.title);
				setStats(readingTime(res.data.body.replace(/<[^>]+>/g, '')));
				setPicture(res.data.profilePic);
				setCategory(res.data.category);
				setUrls(res.data.urls);
				setTags(res.data.tags);
				if (res.data.cgpa) {
					setCgpa(res.data.cgpa);
				}
				if (res.data.branch) {
					setBranch(res.data.branch);
				}
				console.log(cgpa);

				setRecommendations(res.data.recommendations);
				setLoading(false);
				// document.title = res.data.title.replace(/<[^>]+>/g, '');
			})
			.catch((err) => {
				console.log(err);
				setError('Invalid URL');
				setLoading(false);
			});
	}, []);
	return (
		<>
			<div className={classes.root}>
				<ReadStoryBreadcrumbs
					title={title}
					category={category}
					stats={stats}
				/>
				{error && (
					<Alert
						variant="outlined"
						severity="error"
						action={
							<Link color="inherit" underline="none" href="/">
								<Button color="inherit" size="small">
									Go Back To Home
								</Button>
							</Link>
						}
					>
						{error}
					</Alert>
				)}

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
										theme={
											currentTheme === 'light'
												? defaultTheme
												: darkTheme
										}
									/>

									<div>
										{branch && currentTheme === 'light' && (
											<h1
												style={{
													margin: '5px 0px',
												}}
												className="css-1p0umon graf"
											>
												Branch: {branch}
											</h1>
										)}
										{branch && currentTheme === 'dark' && (
											<h1
												style={{
													margin: '5px 0px',
												}}
												className="css-1rrft7a graf"
											>
												Branch: {branch}
											</h1>
										)}
									</div>
									<div>
										{cgpa && currentTheme === 'light' && (
											<h1
												style={{
													margin: '5px 0px',
												}}
												className="css-1p0umon graf"
											>
												CGPA: {cgpa}
											</h1>
										)}
										{cgpa && currentTheme === 'dark' && (
											<h1
												style={{
													margin: '5px 0px',
												}}
												className="css-1rrft7a graf"
											>
												CGPA: {cgpa}
											</h1>
										)}
									</div>
									<Link
										underline="none"
										href={'/category/' + category}
									>
										<div>
											{category &&
											currentTheme === 'light' ? (
												<h2
													style={{
														margin: '5px 0px',
													}}
													className="css-1p0umon graf"
												>
													Role: {category}
												</h2>
											) : (
												<h2
													style={{
														margin: '5px 0px',
													}}
													className="css-1rrft7a graf"
												>
													Role: {category}
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
									{/* <Typography variant="overline">
										{stats.text}
									</Typography> */}
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
						theme={
							currentTheme === 'light' ? defaultTheme : darkTheme
						}
					/>
				)}
				<Disqus.DiscussionEmbed
					shortname={disqusShortname}
					config={disqusConfig}
					blah={currentTheme}
				/>
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
			{body && (
				<Box
					style={{
						width: '100%',
						backgroundColor:
							currentTheme === 'light' ? '#FFDADA' : '#272727',
						padding: '50px 12%',
					}}
				>
					<Typography variant="h6">
						<strong>DISCLAIMER</strong>
					</Typography>
					<Typography variant="body1" style={{ marginTop: '10px' }}>
						The views, thoughts, and opinions expressed in the text
						belong solely to the author and are not necessarily
						endorsed by and do not reflect the official position of{' '}
						<strong>BITSianStories</strong>.
					</Typography>
				</Box>
			)}
		</>
	);
};
