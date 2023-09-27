import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import { Container, Grid, Typography } from '@mui/material';
import Note from './Note';

const Notes = () => {
    const { notes, setNotes } = useContext(noteContext);

    return (
        <Container>
            <Typography component="h1" variant="h4" textAlign={'center'} align='justify' mt={3}>
                Your Notes
            </Typography>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {notes.map((note) => (
                        <Grid item key={note} xs={12} sm={6} md={4}>
                            <Note note={note} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
}

export default Notes