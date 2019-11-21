import React from "react";
import "./Home.scss";
import Hello from "components/Hello";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "wait..." };
  }
  handleConnect = async () => {
    const text = await fetch("/api/hello").then(res => res.text());
    console.log(text);
    this.setState({ value: text });
  };

  componentDidMount() {
    console.log("app mounted !");
    fetch("/api/users/create").then(async () => {
      console.log("new user created");
      const users = await fetch("/api/users").then(res => res.json());
      console.log(users);
    });
  }

  render() {
    return (
      <div id="app-container">
        <h1>Hello World, sylee !!</h1>
        <Hello name="mern" source="components" size={3} />
        <button id="connect-btn" onClick={this.handleConnect}>
          Connect to Server
        </button>
        <div id="text-from-server">{this.state.value}</div>
      </div>
    );
  }
}

export default Home;
