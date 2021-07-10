import { Chip, emphasize, withStyles } from '@material-ui/core';

const StyledBreadcrumb = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.grey[100],
		height: theme.spacing(3),
		color: theme.palette.grey[800],
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover, &:focus': {
			backgroundColor: theme.palette.grey[300],
		},
		'&:active': {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(theme.palette.grey[300], 0.12),
		},
	},
}))(Chip);

export default StyledBreadcrumb;
