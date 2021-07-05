import React, { useState, useEffect } from 'react';
import Dante, { ImageBlockConfig } from 'dante3';
import { makeStyles, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
		marginLeft: '12%',
		marginRight: '12%',
	},
}));

export const CreateStory = () => {
	const classes = useStyles();
	let history = useHistory();
	const [body, setBody] = useState('');
	const [title, setTitle] = useState(
		`<h1 class="graf graf--h"><span style="color: #000">A Catchy Title...</span></h1>`
	);
	const [error, setError] = useState('');
	const [picture, setPicture] = useState();

	const handleSubmit = () => {
		if (title !== '' && body !== '' && picture) {
			let formData = new FormData();

			formData.append('body', body);
			formData.append('title', title);
			formData.append('picture', picture);

			axios.post('/api/story', formData).then((res) => {
				if (res.status === 200) {
					history.push(`/story/${res.data}`);
				} else {
					setError('Failed to create a new Story. Please try again!');
				}
			});
		} else {
			setError('Please fill everything and add profile picture!');
		}
	};

	const onDrop = (pictureFiles, pictureDataURLs) => {
		setPicture(pictureFiles[0]);
	};

	return (
		<div className={classes.root}>
			<Dante
				bodyPlaceholder={'A Catchy Title...'}
				content={title}
				onUpdate={(editor) => {
					setTitle(editor.getHTML());
				}}
			/>
			<Dante
				bodyPlaceholder={'Tell Us Your Story...'}
				content={body}
				widgets={[
					ImageBlockConfig({
						options: {
							upload_url: '/api/upload',
							upload_callback: (ctx, img) => {
								console.log(ctx);
								alert('file uploaded: ' + ctx.data.url);
							},
							upload_error_callback: (ctx, img) => {
								alert(ctx);
							},
						},
					}),
				]}
				onUpdate={(editor) => setBody(editor.getHTML())}
			/>

			<ImageUploader
				withIcon={true}
				buttonText="Choose your profile picture"
				onChange={onDrop}
				imgExtension={['.jpg', '.png']}
				maxFileSize={5242880}
				singleImage={true}
				withPreview={true}
			/>

			{error && (
				<Grid
					container
					alignItems="center"
					direction="row"
					justify="center"
					style={{ marginTop: '20px', marginBottom: '20px' }}
				>
					<Alert severity="error">{error}</Alert>
				</Grid>
			)}

			<Grid
				container
				alignItems="center"
				direction="row"
				justify="center"
			>
				<Button variant="outlined" onClick={handleSubmit}>
					Publish
				</Button>
			</Grid>
		</div>
	);
};
