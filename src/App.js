import React, { Component } from 'react';
import Notes from './component/Note/Notes';
import HeaderLayout from './component/Layout/HeaderLayout';
import Container from '@material-ui/core/Container';
import NotesItem from './component/Note/NoteItem';
import AddNote from './component/Note/AddNote';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Config from './config/Config';

// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    axios.get(Config.BASE_URL + "/notes").then(res => {
      this.setState({ notes: res.data });
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidUpdate(prevProps) {
    axios.get(Config.BASE_URL + "/notes").then(res => {
      this.setState({ notes: res.data });
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <HeaderLayout />
          <Route exact path='/' render={(props => (
            <React.Fragment>
              <Container maxWidth="md">
                <Notes notes={this.state.notes} />
              </Container>
            </React.Fragment>
          ))} />
          <Route exact path='/details/:noteId' component={NotesItem} />
          <Route path='/new' component={AddNote} />

        </div>

      </Router>
    );
  }
}

export default App;
