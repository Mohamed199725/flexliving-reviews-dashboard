import React, { useEffect, useState } from 'react';
import { fetchReviews, fetchApproved, setApproval } from '../api';
import { Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import ReviewCard from '../components/ReviewCard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [reviews, setReviews] = useState([]);
  const [approvedIds, setApprovedIds] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [channel, setChannel] = useState('');
  const [minRating, setMinRating] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    const r = await fetchReviews();
    const a = await fetchApproved();
    setReviews(r);
    setApprovedIds(a);
  }

  async function toggleApprove(id, newVal) {
    await setApproval(id, newVal);
    const a = await fetchApproved();
    setApprovedIds(a);
  }

  const filtered = reviews.filter(r => {
    const ft = filterText.toLowerCase();
    if (filterText && !r.listingName.toLowerCase().includes(ft) && !r.guestName.toLowerCase().includes(ft)) return false;
    if (channel && r.channel !== channel) return false;
    if (minRating && (r.rating || 0) < Number(minRating)) return false;
    return true;
  });

  const listings = {};
  reviews.forEach(r => {
    if (!listings[r.listingName]) listings[r.listingName] = { count: 0, sum: 0 };
    listings[r.listingName].count++;
    listings[r.listingName].sum += (r.rating || 0);
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Listings Overview</Typography>
            {Object.keys(listings).map(name => {
              const meta = listings[name];
              const avg = Math.round((meta.sum / meta.count) * 10) / 10;
              return (
                <div key={name} style={{ marginTop: 10 }}>
                  <Link to={`/property/${encodeURIComponent(name)}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="subtitle1">{name}</Typography>
                  </Link>
                  <Typography variant="body2">Reviews: {meta.count} • Avg: {avg}</Typography>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">Filters</Typography>
            <TextField fullWidth label="Search" value={filterText} onChange={e => setFilterText(e.target.value)} sx={{ mt: 1 }} />
            <TextField fullWidth label="Channel" value={channel} onChange={e => setChannel(e.target.value)} sx={{ mt: 1 }} />
            <TextField fullWidth label="Min rating" type="number" value={minRating} onChange={e => setMinRating(e.target.value)} sx={{ mt: 1 }} />
            <Button onClick={() => { setFilterText(''); setChannel(''); setMinRating(''); }} sx={{ mt: 1 }} variant="outlined">Reset</Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="h5" sx={{ mb: 1 }}>Reviews ({filtered.length})</Typography>
        {filtered.map(r => (
          <ReviewCard
            key={r.id}
            review={r}
            approved={approvedIds.includes(r.id)}
            onToggleApprove={v => toggleApprove(r.id, v)}
          />
        ))}
      </Grid>
    </Grid>
  );
}
