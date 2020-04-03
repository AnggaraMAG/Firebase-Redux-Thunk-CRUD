import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";

import { addDataToAPI, getDataFromAPI } from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: ""
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }
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
    // console.log(data);
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  render() {
    const { title, content } = this.state;
    const { notes } = this.props;
    console.log("notes:", notes);
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
        {notes.length > 0 ? (
          <Fragment>
            {notes.map(note => {
              return (
                <div className="card-content" key={note.id}>
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.data}</p>
                  <p className="content">{note.data.content}</p>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = state => ({
  userData: state.user,
  notes: state.notes
});

const reduxDispatch = dispatch => ({
  saveNotes: data => dispatch(addDataToAPI(data)),
  getNotes: data => dispatch(getDataFromAPI(data))
});
export default connect(reduxState, reduxDispatch)(Dashboard);
