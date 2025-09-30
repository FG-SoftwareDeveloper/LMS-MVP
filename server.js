const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// API proxy to backend (only needed if running as separate service)
// app.use('/api', createProxyMiddleware({
//   target: 'https://lms-mvp-production.up.railway.app',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api': '/api',
//   },
// }));

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'Frontend' });
});

// Handle React Router - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});