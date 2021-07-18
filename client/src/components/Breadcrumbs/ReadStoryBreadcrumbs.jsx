import { Breadcrumbs, Typography } from '@material-ui/core';
import React from 'react';
import StyledBreadcrumb from './StyledBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import SmileIcon from '@material-ui/icons/Mood';

const ReadStoryBreadcrumbs = ({ title, category, stats }) => {
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
			<Typography
				variant="overline"
				color="textSecondary"
				component="p"
				align="right"
				// style={{ paddingTop: '5px' }}
			>
				{stats && stats.text}
			</Typography>
		</Breadcrumbs>
	);
};

export default ReadStoryBreadcrumbs;
