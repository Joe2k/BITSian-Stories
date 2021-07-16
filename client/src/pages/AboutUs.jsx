import { Box, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { CustomThemeContext } from '../context/CustomThemeProvider';

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

const AboutUs = ({ setLoading }) => {
	const classes = useStyles();
	const { currentTheme } = React.useContext(CustomThemeContext);

	React.useEffect(() => {
		window.addEventListener('load', () => {
			setLoading(false);
		});
	}, []);
	return (
		<>
			<Grid container className={classes.root}>
				<Grid item xs={12}>
					<Typography
						variant="h2"
						align="center"
						style={{ fontWeight: 'bold' }}
					>
						About Us
					</Typography>
					<Typography
						variant="body1"
						color="textSecondary"
						align="center"
						style={{
							fontSize: '18px',
							marginTop: '20px',
							fontStyle: 'italic',
						}}
					>
						“What do we propose to do here? We want to teach real
						science whether it is engineering, chemistry,
						humanities, physics or any other branch. We want to
						develop a scientific approach in Pilani, which means
						there would be no dogma. There will be a search for
						truth. What we propose to do here is to cultivate a
						scientific mind.”
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						align="right"
						style={{
							fontSize: '16px',
							marginTop: '20px',
						}}
					>
						The Late Shri G.D. Birla <br />
						Founder Chairman, BITS, Pilani
					</Typography>
					<Typography
						variant="body1"
						color="textPrimary"
						align="center"
						style={{
							fontSize: '22px',
							marginTop: '50px',
						}}
					>
						With this vision in mind, thousands of BITSians have
						achieved a remarkable feat in their lives. Through the
						initiative of ‘BITSian Stories’, we wish to bring the
						experiences and anecdotes of some incredible BITSians
						who have done fantastic in the area of their interests
						so that the upcoming batches can learn from their wisdom
						and knowledge and take the legacy forward!
					</Typography>
				</Grid>
			</Grid>
			<Box
				style={{
					width: '100%',
					backgroundColor:
						currentTheme === 'light' ? '#FFDADA' : '#272727',
					padding: '50px 12%',
					marginTop: '50px',
				}}
			>
				<Typography variant="h6">
					<strong>DISCLAIMER</strong>
				</Typography>
				<Typography variant="body1" style={{ marginTop: '10px' }}>
					This website is initiated, maintained and run by the
					students and alumni of BITS Pilani Hyderabad Campus. The
					content on this website is strictly the property of
					BITSianStories. If you wish to reproduce any content herein,
					please contact us: <br />
					<br /> <strong>Co-ordinator:</strong> Pratik Kamdar <br />
					<strong>Mail to: </strong>
					<Link href="mailto:stories.bitsian@gmail.com">
						stories.bitsian@gmail.com
					</Link>
				</Typography>
			</Box>
		</>
	);
};

export default AboutUs;
