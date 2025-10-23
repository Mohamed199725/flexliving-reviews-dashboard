import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PropertyPage from './pages/PropertyPage';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Flex Living — Reviews</Typography>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/property/:listingName" element={<PropertyPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
