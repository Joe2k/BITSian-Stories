import { Breadcrumbs, makeStyles } from '@material-ui/core';
import React from 'react';
import StyledBreadcrumb from './StyledBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import SmileIcon from '@material-ui/icons/Mood';

const useStyles = makeStyles((theme) => ({
	link: {
		display: 'flex',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}));

const ReadStoryBreadcrumbs = ({ title, category }) => {
	const classes = useStyles();
	return (
		<Breadcrumbs
			aria-label="breadcrumb"
			style={{ marginBottom: '40px', lineHeight: '2' }}
		>
			<StyledBreadcrumb
				component="a"
				href="/"
				label="Home"
				icon={<HomeIcon />}
			/>
			<StyledBreadcrumb
				component="a"
				href={'/category/' + category}
				label={category}
				icon={<SchoolIcon />}
			/>
			<StyledBreadcrumb
				component="a"
				href="#"
				label={title && title.replace(/<[^>]+>/g, '')}
				icon={<SmileIcon />}
			/>
		</Breadcrumbs>
	);
};

export default ReadStoryBreadcrumbs;
