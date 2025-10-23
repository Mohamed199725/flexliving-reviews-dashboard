const express = require('express');
const cors = require('cors');
const reviewsRaw = require('./mockReviews.json');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://flexliving-reviews-dashboard-wybm.onrender.com']
}));
app.use(express.json()); 

const PORT = process.env.PORT || 3001;

let approvedReviewIds = new Set();

// Normalization
function normalizeHostaway(resultArray) {
  return resultArray.map(r => {
    let categoryAvg = null;
    if (Array.isArray(r.reviewCategory) && r.reviewCategory.length) {
      const sum = r.reviewCategory.reduce((s, c) => s + (c.rating || 0), 0);
      categoryAvg = Math.round((sum / r.reviewCategory.length) * 10) / 10;
    }
    return {
      id: r.id,
      listingName: r.listingName,
      type: r.type,
      channel: r.channel || 'hostaway',
      status: r.status,
      rating: r.rating === null ? categoryAvg : r.rating,
      text: r.publicReview || '',
      categories: r.reviewCategory || [],
      submittedAt: r.submittedAt,
      guestName: r.guestName || 'Guest'
    };
  });
}

// API routes 
app.get('/api/reviews/hostaway', (req, res) => {
  const normalized = normalizeHostaway(reviewsRaw.result || []);
  res.json({ status: 'success', result: normalized }); 
});

app.get('/api/reviews/approved', (req, res) => {
  res.json({ status: 'success', approved: Array.from(approvedReviewIds) }); 
});

app.post('/api/reviews/approve', (req, res) => {
  const { reviewId, approved } = req.body;
  if (!reviewId) return res.status(400).json({ status: 'error', message: 'reviewId required' });
  if (approved) approvedReviewIds.add(reviewId);
  else approvedReviewIds.delete(reviewId);
  res.json({ status: 'success', approved: Array.from(approvedReviewIds) }); 
});

// To Serve frontend build after deployment
const path = require('path');
app.use(express.static(path.join(__dirname, '../Frontend/frontend/build')));
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, '../Frontend/frontend/build', 'index.html'));
});


app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


