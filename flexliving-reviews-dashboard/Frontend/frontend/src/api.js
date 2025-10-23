const API_BASE = 'http://localhost:3001';

export async function fetchReviews() {
  try {
    console.log('🔄 Fetching reviews...');
    const r = await fetch(`${API_BASE}/api/reviews/hostaway`);
    const json = await r.json();
    console.log('✅ API Response:', json);
    
    
    if (json.status === 'success') {
      console.log('🎯 Reviews found:', json.result.length);
      return json.result || []; 
    } else {
      console.error('❌ API error:', json);
      return [];
    }
  } catch (error) {
    console.error('❌ Fetch error:', error);
    return [];
  }
}

export async function fetchApproved() {
  try {
    const r = await fetch(`${API_BASE}/api/reviews/approved`);
    const json = await r.json();
    
    
    if (json.status === 'success') {
      return json.approved || [];
    }
    return [];
  } catch (error) {
    console.error('❌ Approved fetch error:', error);
    return [];
  }
}

export async function setApproval(reviewId, approved) {
  try {
    const r = await fetch(`${API_BASE}/api/reviews/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId, approved })
    });
    const json = await r.json();
    return json;
  } catch (error) {
    console.error('❌ Approval error:', error);
    throw error;
  }
}