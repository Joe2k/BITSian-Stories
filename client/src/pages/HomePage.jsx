import React, { useState, useEffect } from 'react';
import Dante from 'dante3';
import { makeStyles, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
		marginLeft: theme.spacing(24),
		marginRight: theme.spacing(24),
	},
}));

export const HomePage = () => {
	const classes = useStyles();
	const [body, setBody] = useState();
	const [heading, setHeading] = useState(
		`<h1 class="graf graf--h"><span style="color: #000">A Catchy Heading...</span></h1>`
	);

	useEffect(() => {
		console.log(heading);
	}, [heading]);

	return (
		<div className={classes.root}>
			<Dante
				bodyPlaceholder={'A Catchy Heading...'}
				content={heading}
				onUpdate={(editor) => {
					setHeading(editor.getHTML());
				}}
			/>
			<Dante
				bodyPlaceholder={'Tell Us Your Story...'}
				content={body}
				onUpdate={(editor) => setBody(editor.getHTML())}
			/>
			<Grid
				container
				alignItems="center"
				direction="row"
				justify="center"
			>
				<Button variant="outlined">Publish</Button>
			</Grid>
		</div>
	);
};
