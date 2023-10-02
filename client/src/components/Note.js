import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import noteContext from '../context/notes/noteContext';
  

const Note = (props) => {
    const {note, handleEdit} = props;
    const { deleteNote } = useContext(noteContext);
    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {note.title}
            </Typography>
            <Typography variant="body2">
                {note.content}
            </Typography>
            <Typography variant='subtitle1' color="text.secondary">
              {note.createdAt}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined" onClick={() => handleEdit(note)}>EDIT</Button>
            <Button size='small' variant="outlined" color="error" onClick={() => {deleteNote(note._id)}}>DELETE</Button>
          </CardActions>
        </Card>
      );
}

export default Note