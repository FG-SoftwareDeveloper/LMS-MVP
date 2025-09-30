#!/bin/bash

# 🚀 Production Integration Script

echo "🔧 Setting up production integration..."

# 1. Update Frontend Environment
echo "VITE_API_URL=https://your-backend-url.railway.app/api/v1" > .env.production

# 2. Update AuthContext to use real API
echo "📝 Remember to update AuthContext.tsx to use real API calls"

# 3. Build backend
echo "🏗️ Building backend..."
cd backend-export
./mvnw clean package -DskipTests

# 4. Build frontend for production
echo "🏗️ Building frontend..."
cd ..
npm run build

echo "✅ Integration setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy backend to Railway/Render"
echo "2. Update VITE_API_URL with actual backend URL"
echo "3. Update AuthContext to use real authentication"
echo "4. Redeploy frontend with updated environment"