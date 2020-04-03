import React, { Component } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";

import { addDataToAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: ""
  };

  // componentDidMount() {
  //   const userData = localStorage.getItem("userData");
  //   console.log("dashboard ==>", JSON.parse(userData));
  // }
  handleSaveNote = () => {
    const { title, content } = this.state;
    const { saveNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    };
    saveNotes(data);
    console.log(data);
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { title, content } = this.state;
    return (
      <div className="container">
        <div className="input-form">
          <input
            id="title"
            placeholder="title"
            className="input-title"
            value={title}
            onChange={this.handleInput}
          />
          <textarea
            id="content"
            placeholder="content"
            className="input-content"
            value={content}
            onChange={this.handleInput}
          />
          <button className="save-btn" onClick={this.handleSaveNote}>
            Simpan
          </button>
        </div>
        <hr />
        <div className="card-content">
          <p className="title">Title</p>
          <p className="date">21-09-2030</p>
          <p className="content">Content</p>
        </div>
      </div>
    );
  }
}

const reduxState = state => ({
  userData: state.user
});

const reduxDispatch = dispatch => ({
  saveNotes: data => dispatch(addDataToAPI(data))
});
export default connect(reduxState, reduxDispatch)(Dashboard);
