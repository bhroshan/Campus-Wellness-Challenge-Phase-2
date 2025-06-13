import React, { useEffect, useState } from 'react';
import { Box, Modal, Typography, Checkbox, List, ListItem, ListItemText, ListItemIcon, Button, CircularProgress, Avatar, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { API_URL } from '../configs';

const style = {
  position: 'absolute',
  top: '5%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  width: '90%',
  maxWidth: 400,
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
};

const EnrollModal = ({ open, onClose, students, onSubmit, loading }) => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) setSelected([]);
    setSearch('');
  }, [open]);

  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    onSubmit(selected);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.first_name.toLowerCase().includes(search.toLowerCase()) ||
      student.last_name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box sx={{ p: 3, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">Enroll Students</Typography>
        </Box>
        {/* Search */}
        <Box sx={{ px: 2, pt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by name or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>
        {/* Scrollable List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2, pt: 0, minHeight: 100 }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {filteredStudents.length === 0 && <Typography>No students available</Typography>}
              {filteredStudents.map((student) => (
                <ListItem key={student._id} button onClick={() => handleToggle(student._id)} sx={{ cursor: 'pointer'}}>
                  <ListItemIcon>
                    <Checkbox edge="start" checked={selected.includes(student._id)} tabIndex={-1} />
                  </ListItemIcon>
                  <Avatar
                    src={student.profile_image ? `${API_URL}${student.profile_image}` : undefined}
                    alt={`${student.first_name} ${student.last_name}`}
                    sx={{ width: 32, height: 32, mr: 2 }}
                  />
                  <ListItemText primary={`${student.first_name} ${student.last_name}`} secondary={student.email} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={selected.length === 0 || loading}>Enroll</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EnrollModal;
