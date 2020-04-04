import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";

import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    sortType: "desc",
    textButton: "SIMPAN",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }
  handleSaveNote = () => {
    const { title, content, noteId, textButton } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };
    if (textButton === "SIMPAN") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
  };

  handleInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  updateNotes = (note) => {
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };

  handleDelete = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNote(data);
    // alert("haiii");
  };
  render() {
    const { title, content, sortType, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, cancelUpdate, handleDelete } = this;

    const sorted = notes.sort((a, b) => {
      const isReserved = sortType === "asc" ? 1 : -1;
      return isReserved * a.id.localeCompare(b.id);
    });
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
          <div className="action-wrapper">
            {textButton === "UPDATE" ? (
              <button className="save-btn cancel" onClick={cancelUpdate}>
                Cancel
              </button>
            ) : null}
            {""}
            <button className="save-btn" onClick={this.handleSaveNote}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {sorted.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.data}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => handleDelete(e, note)}
                  >
                    x
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNote: (data) => dispatch(deleteDataAPI(data)),
});
export default connect(reduxState, reduxDispatch)(Dashboard);
