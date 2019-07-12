import React, { Component } from 'react';
import { Button, Card, Typography, CardMedia, CardContent, Grid, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

class Notes extends Component {

    render() {
        return (
            <Grid container spacing={4}>
                {this.props.notes.map(note => (
                    <Grid item key={note.id} xs={12} sm={6} md={4}>
                        <Card >
                            <CardMedia
                                image={`${note.imageUrl}`}
                                title="Image title"
                                style={{ height: 0, paddingTop: '100%' }}
                            />
                            <CardContent >

                                <Typography gutterBottom variant="h5" component="h2">
                                    {note.title}
                                </Typography>
                                <Typography>
                                    {note.description}
                                </Typography>
                            </CardContent>
                            <CardActions>

                                <Link to={`/details/${note.id}`}>
                                    <Button size="small" color="primary">View details</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        )
    }
}

export default Notes;