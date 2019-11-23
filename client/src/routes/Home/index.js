import React from "react";

import LoadImage from "assets/images/loading.gif";

import "./Home.scss";
import Hello from "components/Hello";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "wait...", isLoading: true };
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
      this.setState({ isLoading: false });
    });
  }

  render() {
    console.log("REACT PORT:", process.env.REACT_PORT);
    return (
      <div>
        {this.state.isLoading ? (
          <div id="app-container">
            <img src={LoadImage} alt="loading" />
          </div>
        ) : (
          <div id="app-container">
            <h1>Hello World, sylee !!</h1>
            <Hello name="mern" source="components" size={3} />
            <button id="connect-btn" onClick={this.handleConnect}>
              Connect to Server
            </button>
            <div id="text-from-server">{this.state.value}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
