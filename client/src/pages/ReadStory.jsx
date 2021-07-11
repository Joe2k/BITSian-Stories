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
}));

export const ReadStory = () => {
	const classes = useStyles();
	const [body, setBody] = useState();
	const [title, setTitle] = useState();
	const [picture, setPicture] = useState();
	const [category, setCategory] = useState('');
	const [urls, setUrls] = useState({});
	const [tags, setTags] = useState([]);
	let { id } = useParams();

	useEffect(() => {
		axios.get(`/api/story/${id}`).then((res) => {
			console.log(res.data);
			setBody(res.data.body);
			setTitle(res.data.title);
			setPicture(res.data.profilePic);
			setCategory(res.data.category);
			setUrls(res.data.urls);
			setTags(res.data.tags);
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

								<ConnectionButtons urls={urls} />
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
		</div>
	);
};
