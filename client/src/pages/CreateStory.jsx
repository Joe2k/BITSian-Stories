import React, { useState } from 'react';
import Dante, { ImageBlockConfig } from 'dante3';
import {
	makeStyles,
	Button,
	Grid,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
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

export const CreateStory = ({ setLoading }) => {
	const classes = useStyles();
	const { currentTheme } = React.useContext(CustomThemeContext);
	let history = useHistory();
	const [body, setBody] = useState('');
	const [title, setTitle] = useState(
		`<h1 class="graf graf--h"><span style="color: #000">A Catchy Title...</span></h1>`
	);
	const [error, setError] = useState('');
	const [picture, setPicture] = useState();
	const [tags, setTags] = useState([]);
	const [urls, setUrls] = useState({
		linkedin: '',
		facebook: '',
		github: '',
		instagram: '',
		email: '',
	});
	const [category, setCategory] = useState();
	const [uniqueName, setUniqueName] = useState();
	const [cgpa, setCgpa] = useState();
	const [branch, setBranch] = useState('');
	const [password, setPassword] = useState('');

	React.useEffect(() => {
		window.addEventListener('load', () => {
			setLoading(false);
		});
	}, []);

	const handleSubmit = () => {
		if (
			title !== '' &&
			body !== '' &&
			picture &&
			category &&
			uniqueName !== '' &&
			branch !== ''
		) {
			let formData = new FormData();

			formData.append('body', body);
			formData.append('title', title);
			formData.append('picture', picture);
			formData.append('category', category);
			formData.append('tags', JSON.stringify(tags));
			formData.append('urls', JSON.stringify(urls));
			formData.append('uniqueName', uniqueName);
			formData.append('branch', branch);
			formData.append('password', password);
			if (cgpa) {
				formData.append('cgpa', cgpa);
			}

			axios
				.post('/api/story', formData)
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

	const onDrop = (pictureFiles, pictureDataURLs) => {
		setPicture(pictureFiles[0]);
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
			<Dante
				bodyPlaceholder={'A Catchy Title...'}
				content={title}
				onUpdate={(editor) => {
					setTitle(editor.getHTML());
				}}
				theme={currentTheme === 'light' ? defaultTheme : darkTheme}
			/>
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

			<ImageUploader
				withIcon={true}
				buttonText="Choose your profile picture"
				onChange={onDrop}
				imgExtension={['.jpg', '.png', '.jpeg']}
				maxFileSize={5242880}
				singleImage={true}
				withPreview={true}
			/>
			<InputLabel id="demo-simple-select-label">
				Select Category *
			</InputLabel>
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
				<MenuItem value={'Research'}>Research</MenuItem>
			</Select>
			<FormHelperText>Required</FormHelperText>
			<TextField
				id="cgpa"
				label="CGPA"
				fullWidth
				type="number"
				onChange={(e) => setCgpa(e.target.value)}
			/>
			<TextField
				id="unique_name"
				label="Unique Name - Enter a unique name with no spaces which wil be used in the URL of the story"
				fullWidth
				placeholder="eg. jonathan-samuel"
				onChange={(e) => setUniqueName(e.target.value)}
				required
			/>
			<TextField
				id="branch"
				label="Branch"
				fullWidth
				placeholder="eg. Electronics and Communication"
				onChange={(e) => setBranch(e.target.value)}
				required
			/>
			<TextField
				id="linkedin"
				label="Linkedin URL (Optional)"
				fullWidth
				onChange={handleChange}
			/>
			<TextField
				id="facebook"
				label="Facebook URL (Optional)"
				fullWidth
				onChange={handleChange}
			/>
			<TextField
				id="github"
				label="GitHub URL (Optional)"
				fullWidth
				onChange={handleChange}
			/>
			<TextField
				id="email"
				label="Email Address (Optional)"
				fullWidth
				onChange={handleChange}
			/>
			<TextField
				id="instagram"
				label="Instagram URL (Optional)"
				fullWidth
				onChange={handleChange}
			/>
			<TextField
				id="password"
				label="Password"
				required
				fullWidth
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div style={{ marginTop: '20px' }}>
				<ReactTags
					tags={tags}
					handleDelete={handleDelete}
					handleAddition={handleAddition}
					delimiters={delimiters}
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
				<Button variant="outlined" onClick={handleSubmit}>
					Publish
				</Button>
			</Grid>
		</div>
	);
};
