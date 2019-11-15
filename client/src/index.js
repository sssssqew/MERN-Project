import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: "wait..."};
	}
	handleConnect = async ()=>{
		const text = await fetch("http://localhost:5000/hello").then(res => res.text());
		console.log(text);
		this.setState({value:text});
	}

	render(){
		return (
			<div style={{display:"flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
			  <h1>Hello World, sylee !!</h1>
			  <button onClick={this.handleConnect} style={{all:"unset", background: "black", color: "white", padding:"10px", borderRadius: "10px", cursor: "pointer"}}>Connect to Server</button>
				<div style={{margin:"30px",padding:"10px",fontWeight: "600",background: "skyblue", color:"white"}}>{this.state.value}</div>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
