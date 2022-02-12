import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import { Button, Icon } from '@material-ui/core';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { CustomThemeContext } from '../../context/CustomThemeProvider';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',

		[theme.breakpoints.up('md')]: {
			display: 'flex',
			alignItems: 'center',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	button: {
		padding: '6px 16px',
	},
}));

function Navbar() {
	const classes = useStyles();
	const { currentTheme, setTheme } = React.useContext(CustomThemeContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	// React.useEffect(() => {
	// 	console.log(props);
	// }, []);

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<>
				<MenuItem>
					<Link
						href="/category/tech"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-laptop-code"
							color="secondary"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Tech
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="/category/core"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-cogs"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Core
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="/category/finance"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-percentage"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Finance
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="/category/business"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-chart-line"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Business
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="/category/product"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-tasks"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Product
						</Button>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link
						href="/category/research"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-flask"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							Research
						</Button>
					</Link>
				</MenuItem>

				{/* <MenuItem>
					<Link href="/story/new" underline="none">
						<Button className={classes.button} color="secondary">New</Button>
					</Link>
				</MenuItem> */}
				<MenuItem>
					<Link
						href="/about"
						underline="none"
						color="secondary"
						style={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						<Icon
							className="fas fa-users"
							style={{
								marginRight: '10px',
								width: '30px',
							}}
							fontSize="default"
						></Icon>
						<Button className={classes.button} color="secondary">
							About Us
						</Button>
					</Link>
				</MenuItem>
			</>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar color="inherit" position="static">
				<Toolbar>
					{/* <Link color="inherit" underline="none" href="/">
						<img
							src={
								currentTheme === 'light'
									? '/light.png'
									: '/dark.png'
							}
							style={{ height: '40px' }}
							alt="logo"
						/>
					</Link> */}

					<Typography
						className={classes.title}
						variant="h6"
						noWrap
						color="primary"
					>
						<Link color="inherit" underline="none" href="/">
							BITSian Stories
						</Link>
					</Typography>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<>
							<Link
								href="/category/tech"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Tech
								</Button>
							</Link>
							<Link
								href="/category/core"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Core
								</Button>
							</Link>
							<Link
								href="/category/finance"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Finance
								</Button>
							</Link>
							<Link
								href="/category/business"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Business
								</Button>
							</Link>
							<Link
								href="/category/product"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Product
								</Button>
							</Link>
							<Link
								href="/category/research"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									Research
								</Button>
							</Link>

							{/* <Link
								href="/story/new"
								underline="none"
								color="secondary"
							>
								<Button className={classes.button} color="secondary">New</Button>
							</Link> */}

							<Link
								href="/about"
								underline="none"
								color="secondary"
							>
								<Button
									className={classes.button}
									color="secondary"
								>
									About Us
								</Button>
							</Link>
							<IconButton
								className={classes.button}
								color="secondary"
								onClick={() => {
									if (currentTheme === 'light')
										setTheme('dark');
									else setTheme('light');
								}}
							>
								{currentTheme === 'dark' ? (
									<Brightness7Icon />
								) : (
									<Brightness3Icon />
								)}
							</IconButton>
							<Link
								href="https://github.com/Joe2k/BITSian-Stories"
								target="_blank"
								underline="none"
							>
								<IconButton
									className={classes.button}
									color="secondary"
								>
									<Icon
										className="fab fa-github"
										color="secondary"
									></Icon>
								</IconButton>
							</Link>
						</>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							className={classes.button}
							color="secondary"
							onClick={() => {
								if (currentTheme === 'light') setTheme('dark');
								else setTheme('light');
							}}
						>
							{currentTheme === 'dark' ? (
								<Brightness7Icon />
							) : (
								<Brightness3Icon />
							)}
						</IconButton>
						<IconButton
							className={classes.button}
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="secondary"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}

export default Navbar;
