import React, { useState, useEffect } from 'react';
import Dante, { ImageBlockConfig } from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	Input,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { WithContext as ReactTags } from 'react-tag-input';
import defaultTheme from '../themes/default';
import darkTheme from '../themes/dark';
import { CustomThemeContext } from '../context/CustomThemeProvider';

const KeyCodes = {
	comma: 188,
	enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(8),
		marginLeft: '12%',
		marginRight: '12%',
	},
}));

export const UpdatePage = () => {
	const classes = useStyles();
	const { currentTheme } = React.useContext(CustomThemeContext);
	let history = useHistory();
	const [body, setBody] = useState('');
	const [title, setTitle] = useState('');
	const [error, setError] = useState('');
	const [tags, setTags] = useState([]);
	const [urls, setUrls] = useState({
		linkedin: '',
		facebook: '',
		github: '',
		instagram: '',
		email: '',
	});
	const [category, setCategory] = useState();
	const [cgpa, setCgpa] = useState();
	const [branch, setBranch] = useState('');
	let { uniqueName } = useParams();

	useEffect(() => {
		axios.get(`/api/story/${uniqueName}`).then((res) => {
			console.log(res.data);
			setBody(res.data.body);
			setTitle(res.data.title);
			setCategory(res.data.category);
			setUrls(res.data.urls);
			if (res.data.cgpa) {
				setCgpa(res.data.cgpa);
			}
			if (res.data.branch) {
				setCgpa(res.data.brach);
			}

			res.data.tags.forEach((tag, i, arr) => {
				arr[i].id = tag.text;
				arr[i].key = tag.text;
			});
			setTags(res.data.tags);

			//document.title = res.data.title.replace(/<[^>]+>/g, '');
		});
	}, []);

	const handleSubmit = () => {
		if (
			title !== '' &&
			body !== '' &&
			category &&
			uniqueName !== '' &&
			branch !== ''
		) {
			let data = { body, title, category, urls, tags, branch };
			if (cgpa) {
				data = { ...data, cgpa };
			}

			axios
				.put('/api/story/' + uniqueName, data)
				.then((res) => {
					if (res.status === 200) {
						history.push(`/story/${res.data}`);
					} else {
						console.log(res);
						setError(
							'Failed to create a new Story. Please try again! \n' +
								res.data
						);
					}
				})
				.catch((e) => {
					console.log(e);
					setError(
						'Failed to create a new Story. Please try again or create new unique name!'
					);
				});
		} else {
			setError('Please fill everything necessary!');
		}
	};

	const handleDelete = (i) => {
		setTags(tags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags([...tags, tag]);
	};
	const handleChange = (e) => {
		setUrls({ ...urls, [e.target.id]: e.target.value });
	};

	return (
		<div className={classes.root}>
			{title && (
				<Dante
					bodyPlaceholder={'A Catchy Title...'}
					content={title}
					onUpdate={(editor) => {
						setTitle(editor.getHTML());
					}}
					theme={currentTheme === 'light' ? defaultTheme : darkTheme}
				/>
			)}

			{body && (
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
					theme={currentTheme === 'light' ? defaultTheme : darkTheme}
				/>
			)}

			<InputLabel id="demo-simple-select-label">
				Select Category *
			</InputLabel>
			{category && (
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					fullWidth
				>
					<MenuItem value={'Core'}>Core</MenuItem>
					<MenuItem value={'Tech'}>Tech</MenuItem>
					<MenuItem value={'Product'}>Product</MenuItem>
					<MenuItem value={'Business'}>Business</MenuItem>
					<MenuItem value={'Finance'}>Finance</MenuItem>
				</Select>
			)}

			<FormHelperText>Required</FormHelperText>
			<TextField
				id="cgpa"
				label="CGPA"
				fullWidth
				type="number"
				value={cgpa}
				onChange={(e) => setCgpa(e.target.value)}
			/>
			<TextField
				id="branch"
				label="Branch"
				fullWidth
				type="text"
				required
				value={branch}
				onChange={(e) => setBranch(e.target.value)}
			/>
			<TextField
				id="linkedin"
				label="Linkedin URL (Optional)"
				fullWidth
				value={urls.linkedin}
				onChange={handleChange}
			/>
			<TextField
				id="facebook"
				label="Facebook URL (Optional)"
				fullWidth
				value={urls.facebook}
				onChange={handleChange}
			/>
			<TextField
				id="github"
				label="GitHub URL (Optional)"
				fullWidth
				value={urls.github}
				onChange={handleChange}
			/>
			<TextField
				id="email"
				label="Email Address (Optional)"
				fullWidth
				value={urls.email}
				onChange={handleChange}
			/>
			<TextField
				id="instagram"
				label="Instagram URL (Optional)"
				fullWidth
				value={urls.instagram}
				onChange={handleChange}
			/>
			<div style={{ marginTop: '20px' }}>
				<ReactTags
					tags={tags}
					handleDelete={handleDelete}
					handleAddition={handleAddition}
					allowDragDrop={false}
				/>
			</div>

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
				style={{ marginTop: '20px' }}
			>
				{category && (
					<Button variant="outlined" onClick={handleSubmit}>
						Update
					</Button>
				)}
			</Grid>
		</div>
	);
};
