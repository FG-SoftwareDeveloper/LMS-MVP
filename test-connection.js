// Test Frontend-Backend Connection
// Run this in your browser console at https://lms-mvp-jet.vercel.app/

console.log('Testing Frontend-Backend Connection...');

// Test 1: Health Check
fetch('https://lms-mvp-production.up.railway.app/api/v1/health')
  .then(response => {
    console.log('✅ Health Check Status:', response.status);
    return response.text();
  })
  .then(data => {
    console.log('✅ Health Check Response:', data);
  })
  .catch(error => {
    console.error('❌ Health Check Error:', error);
  });

// Test 2: Root Endpoint
fetch('https://lms-mvp-production.up.railway.app/')
  .then(response => {
    console.log('✅ Root Endpoint Status:', response.status);
    return response.text();
  })
  .then(data => {
    console.log('✅ Root Response:', data);
  })
  .catch(error => {
    console.error('❌ Root Endpoint Error:', error);
  });

// Test 3: Check Environment Variables
console.log('Environment Variables Check:');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('VITE_ENVIRONMENT:', import.meta.env.VITE_ENVIRONMENT);

console.log('Connection test complete!');