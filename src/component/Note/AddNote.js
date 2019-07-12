import React, { Component } from 'react'
import { Container, Card, TextField, Button } from '@material-ui/core';
import '../../App.css'
import axios from 'axios';
import Config from '../../config/Config';

export default class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            title:"",
            description:""
        }

    }

    onFileChangeHandler = event => {
        
        const data = new FormData() 
        data.append('file', event.target.files[0]);
        axios.post(Config.BASE_URL + "/ftp/upload",data).then(res=>{
            if(res.data && res.data.result){
                this.setState({selectedFile:res.data.result[0].url})
            }
        }).catch(err=>{
            console.log(err);
        })
        
    }
    handleChange = (fieldName) => event => {
        this.setState({[fieldName]:event.target.value});
    }
    handleSubmit=(event)=> {
        let data={
            "title":this.state.title,
            "description":this.state.description,
            "imageUrl":this.state.selectedFile
        }
        axios.post(Config.BASE_URL + "/notes",data).then(res=>{
            this.props.history.push('/');
        }).catch(err=>{
            console.log(err);
        })
        event.preventDefault();
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Card>
                        <form autoComplete="off" onSubmit={this.handleSubmit} align='center' style={{margin:25}}> 

                            <TextField
                                id="filled-title"
                                label="title"
                                value={this.state.title}
                                onChange={this.handleChange('title')}
                                margin="normal"
                                fullWidth
                                variant="filled" />
                            <TextField
                                id="filled-description"
                                label="description"
                                placeholder="Please add description here...."
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                margin="normal"
                                fullWidth
                                multiline
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled" />
                            <div align="left">
                                <label>select a file</label>
                                <input type='file' name="file" onChange={this.onFileChangeHandler}></input>
                            </div>
                            <Button variant="contained" fullWidth color="primary" type='submit' style={{marginTop:25}}>
                                submit
                            </Button>
                        </form>
                    </Card>
                </Container>
            </React.Fragment>
        )
    }
}
