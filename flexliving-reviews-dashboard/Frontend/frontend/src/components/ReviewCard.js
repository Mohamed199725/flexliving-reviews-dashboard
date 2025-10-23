import React from 'react';
import { Card, CardContent, Typography, Chip, Grid, Switch, FormControlLabel } from '@mui/material';

export default function ReviewCard({ review, approved, onToggleApprove }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={9}>
            <Typography variant="subtitle1">{review.listingName} — {review.guestName}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{review.text}</Typography>
            <div style={{ marginTop: 8 }}>
              <Chip label={`Rating: ${review.rating || 'N/A'}`} size="small" sx={{ mr: 1 }} />
              {review.categories.map(c => (
                <Chip key={c.category} label={`${c.category}: ${c.rating}`} size="small" sx={{ mr: 1, mt: 1 }} />
              ))}
            </div>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'right' }}>
            <FormControlLabel
              control={<Switch checked={approved} onChange={e => onToggleApprove(e.target.checked)} />}
              label={approved ? 'Approved' : 'Show?'}
            />
            <Typography variant="caption" display="block">{review.submittedAt}</Typography>
            <Typography variant="caption" display="block">Channel: {review.channel}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
