import React, { useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Notes from './Notes';
import noteContext from '../context/notes/noteContext';
import { bottomNavigationClasses } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Navbar from './Navbar';

const defaultTheme = createTheme();

const Home = () => {

  const [open, setOpen] = useState(false);

  const [editNote, setEditNote] = useState({ title: "", content: "" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { addNote, updateNote } = useContext(noteContext);

  const [note, setNote] = useState({ title: "", content: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addNote({title: data.get('title'), content: data.get('content')});
  };

  const handleChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value })
  };

  const handleChangeEdit = (event) => {
    setEditNote({ ...editNote, [event.target.name]: event.target.value })
  };

  const handleEdit = (note) => {
    setEditNote(note);
    handleClickOpen();
  };

  const handleEditSubmit = () => {
    updateNote(editNote._id, editNote.title, editNote.content);
    handleClose();
  };

  return (
    <>
      <Navbar />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle textAlign={'center'} variant='h5'>Edit your note</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={editNote.title}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="content"
            label="Content"
            id="content"
            autoComplete="off"
            value={editNote.content}
            onChange={handleChangeEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" style={{margin: '0 auto', display: "flex"}} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" style={{margin: '0 auto', display: "flex"}} onClick={handleEditSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={7}
            md={8}
            sx={{
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'whitesmoke',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <Notes handleEdit={handleEdit} />
          </Grid>
          <Grid item xs={12} sm={5} md={4} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Add a New Note
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="content"
                  label="Content"
                  id="content"
                  autoComplete="off"
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Home