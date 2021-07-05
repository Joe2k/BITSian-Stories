import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Box,
	Link,
	IconButton,
	Icon,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
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
	linkBox: {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			justifyContent: 'center',
		},
	},
}));

export const ReadStory = () => {
	const classes = useStyles();
	const [body, setBody] = useState();
	const [title, setTitle] = useState();
	const [picture, setPicture] = useState();
	let { id } = useParams();

	useEffect(() => {
		axios.get(`/api/story/${id}`).then((res) => {
			console.log(res.data);
			setBody(res.data.body);
			setTitle(res.data.title);
			setPicture(res.data.profilePic);
			document.title = res.data.title.replace(/<[^>]+>/g, '');
		});
	}, []);

	return (
		<div className={classes.root}>
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
								<Box className={classes.linkBox}>
									<Link
										href=""
										target="_blank"
										underline="none"
									>
										<IconButton
											color="primary"
											component="span"
										>
											<Icon
												className="fab fa-linkedin"
												color="primary"
												fontSize="large"
											></Icon>
										</IconButton>
									</Link>
									<Link
										href=""
										target="_blank"
										underline="none"
									>
										<IconButton
											color="primary"
											component="span"
										>
											<Icon
												className="fas fa-share-alt"
												color="primary"
												fontSize="large"
											></Icon>
										</IconButton>
									</Link>
								</Box>
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
