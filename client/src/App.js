import './App.css';
import Dante from 'dante3';
import React from 'react';

function App() {
	const [data, setData] = React.useState({});

	return (
		<div className="App">
			<Dante
				content={data}
				onUpdate={(editor) => setData(editor.getJSON())}
			/>
		</div>
	);
}

export default App;
