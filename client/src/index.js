import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CustomThemeProvider from './context/CustomThemeProvider';

// const theme = createMuiTheme({
// 	palette: {
// 		type: 'light',
// 	},
// });

ReactDOM.render(
	<CustomThemeProvider>
		<CssBaseline />
		<App />
	</CustomThemeProvider>,
	document.getElementById('root')
);
