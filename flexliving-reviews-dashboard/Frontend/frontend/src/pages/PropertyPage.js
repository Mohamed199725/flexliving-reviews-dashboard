import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews, fetchApproved } from '../api';
import { Typography, Card, CardContent } from '@mui/material';
import ReviewCard from '../components/ReviewCard';

export default function PropertyPage() {
  const { listingName } = useParams();
  const decoded = decodeURIComponent(listingName);
  const [reviews, setReviews] = useState([]);
  const [approvedIds, setApprovedIds] = useState([]);

  useEffect(() => { load(); }, [listingName]);

  async function load() {
    const r = await fetchReviews();
    const a = await fetchApproved();
    setReviews(r.filter(x => x.listingName === decoded));
    setApprovedIds(a);
  }

  const approvedReviews = reviews.filter(r => approvedIds.includes(r.id));

  return (
    <div>
      <Typography variant="h4">{decoded}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Approved reviews shown below</Typography>
      {approvedReviews.length === 0 && (
        <Card><CardContent><Typography>No approved reviews yet.</Typography></CardContent></Card>
      )}
      {approvedReviews.map(r => <ReviewCard key={r.id} review={r} approved={true} onToggleApprove={() => {}} />)}
    </div>
  );
}
