import React from 'react';
import { Chip, emphasize, withStyles } from '@material-ui/core';
import { CustomThemeContext } from '../../context/CustomThemeProvider';

const StyledBreadcrumb = withStyles((theme) => {
	const { currentTheme } = React.useContext(CustomThemeContext);
	const bgColor =
		currentTheme === 'light'
			? theme.palette.grey[100]
			: theme.palette.grey[900];

	const actualColor =
		currentTheme === 'light'
			? theme.palette.grey[800]
			: theme.palette.grey[100];

	const bgHover =
		currentTheme === 'light'
			? theme.palette.grey[300]
			: theme.palette.grey[800];

	return {
		root: {
			backgroundColor: bgColor,
			height: theme.spacing(3),
			color: actualColor,
			fontWeight: theme.typography.fontWeightRegular,
			'&:hover, &:focus': {
				backgroundColor: bgHover,
			},
			'&:active': {
				boxShadow: theme.shadows[1],
				backgroundColor: emphasize(bgHover, 0.12),
			},
		},
	};
})(Chip);

export default StyledBreadcrumb;
