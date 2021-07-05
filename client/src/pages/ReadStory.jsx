import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import { makeStyles, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
		marginLeft: '12%',
		marginRight: '12%',
	},
}));

export const ReadStory = () => {
	const classes = useStyles();
	const [body, setBody] = useState();
	const [title, setTitle] = useState();
	let { id } = useParams();

	useEffect(() => {
		axios.get(`/api/story/${id}`).then((res) => {
			// console.log(res.data);
			setBody(res.data.body);
			setTitle(res.data.title);
		});
	}, []);

	return (
		<div className={classes.root}>
			{title && body && (
				<>
					<Dante
						bodyPlaceholder={'A Catchy Title...'}
						content={title}
						widgets={[]}
						readOnly={true}
					/>
					<Dante
						bodyPlaceholder={'Story goes here...'}
						content={body}
						widgets={[]}
						readOnly={true}
					/>
				</>
			)}
		</div>
	);
};
