import { Breadcrumbs } from '@material-ui/core';
import React from 'react';
import StyledBreadcrumb from './StyledBreadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';

const CategoryPageBreadcrumbs = ({ category }) => {
	let newCategory = category
		.toLowerCase()
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');
	return (
		<Breadcrumbs aria-label="breadcrumb" style={{ lineHeight: '2' }}>
			<StyledBreadcrumb
				component="a"
				href="/"
				label="Home"
				icon={<HomeIcon />}
			/>
			<StyledBreadcrumb
				component="a"
				href={'#'}
				label={newCategory}
				icon={<SchoolIcon />}
			/>
		</Breadcrumbs>
	);
};

export default CategoryPageBreadcrumbs;
