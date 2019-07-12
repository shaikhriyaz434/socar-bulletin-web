import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import { Card, Typography, CardActions, CardMedia, CardContent, Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Axios from 'axios';
import Config from '../../config/Config';
export class NoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment: "",
            note: {
                comment: []
            }
        };
    }
    componentDidMount() {
        let { noteId } = this.props.match.params;
        console.log(noteId)
        Axios.get(Config.BASE_URL + "/notes/" + noteId).then(res => {
            this.setState({ note: res.data, newComment: "" });
        }).catch(err => {
            console.log(err);
        })
    }
    handleChange = (fieldName) => event => {
        this.setState({ [fieldName]: event.target.value });
    }
    handleSubmit = (event) => {
        let data = this.state.note;
        data.comment.push({ title: this.state.newComment });
        Axios.put(`${Config.BASE_URL} + /notes/${this.state.note.id}`, data).then(res => {
            this.setState({ newComment: "" })
            this.props.history.push('/details/' + this.state.note.id);
        }).catch(err => {
            console.log(err);
        })
        event.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth='sm'>
                    <Card >
                        <CardMedia
                            image={`${this.state.note.imageUrl}`}
                            style={{ height: 0, paddingTop: '100%' }}
                        />
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.note.title}
                            </Typography>
                            <Typography>
                                {this.state.note.description}
                            </Typography>
                            <Typography color="primary">
                                Comments:
                            </Typography>
                            <div>
                                {this.state.note.comment.map(item => (
                                    <Typography>
                                        {item.title}
                                    </Typography>
                                ))}

                            </div>
                            <form style={{ margin: 25 }} autoComplete="off" onSubmit={this.handleSubmit}>
                                <TextField
                                    id="filled-newComment"
                                    label="Add new comment"
                                    value={this.state.newComment}
                                    onChange={this.handleChange('newComment')}
                                    margin="normal"
                                    fullWidth
                                    variant="filled" />
                            </form>


                        </CardContent>
                        <CardActions>

                            <Link to='/'>
                                <Button size="small" color="primary">Back</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}

export default NoteItem
