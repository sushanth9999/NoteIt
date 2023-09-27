import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
  

const Note = (props) => {
    const {note} = props;
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
            <Button size="small" variant="outlined">EDIT</Button>
            <Button size='small' variant="outlined" color="error">DELETE</Button>
          </CardActions>
        </Card>
      );
}

export default Note