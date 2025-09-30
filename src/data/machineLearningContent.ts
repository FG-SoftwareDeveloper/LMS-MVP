// Machine Learning course content
export const machineLearningContent: { [key: string]: any } = {
  "ml-introduction": {
    id: "ml-introduction",
    title: "Introduction to Machine Learning",
    type: "text",
    duration: 25,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to Machine Learning!",
        content: "Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data without being explicitly programmed. It's revolutionizing industries from healthcare to finance, transportation to entertainment."
      },
      {
        id: "what-is-ml",
        type: "text",
        title: "What is Machine Learning?",
        content: "Machine Learning involves algorithms that:\n\n🧠 **Learn from Data**: Identify patterns in large datasets\n📊 **Make Predictions**: Forecast future outcomes\n🎯 **Improve Performance**: Get better with more data\n🔄 **Automate Decisions**: Reduce need for manual intervention\n\n**Types of Machine Learning:**\n• **Supervised Learning**: Learning with labeled data (classification, regression)\n• **Unsupervised Learning**: Finding patterns in unlabeled data (clustering, dimensionality reduction)\n• **Reinforcement Learning**: Learning through trial and error with rewards\n\nML powers recommendation systems, image recognition, natural language processing, and autonomous vehicles!"
      },
      {
        id: "example",
        type: "code",
        title: "Simple Machine Learning Example",
        language: "python",
        content: "# Simple Linear Regression with scikit-learn\nimport numpy as np\nfrom sklearn.linear_model import LinearRegression\nimport matplotlib.pyplot as plt\n\n# Sample data: house sizes (sq ft) and prices\nhouse_sizes = np.array([[1000], [1500], [2000], [2500], [3000]])\nprices = np.array([200000, 300000, 400000, 500000, 600000])\n\n# Create and train the model\nmodel = LinearRegression()\nmodel.fit(house_sizes, prices)\n\n# Make predictions\nnew_house_size = np.array([[1800]])\npredicted_price = model.predict(new_house_size)\n\nprint(f\"Predicted price for 1800 sq ft house: ${predicted_price[0]:,.2f}\")\n\n# Model performance\naccuracy = model.score(house_sizes, prices)\nprint(f\"Model accuracy: {accuracy:.2%}\")"
      },
      {
        id: "applications",
        type: "text",
        title: "Real-World Applications",
        content: "**Machine Learning in Action:**\n\n🏥 **Healthcare**: Disease diagnosis, drug discovery, medical imaging\n🏦 **Finance**: Fraud detection, algorithmic trading, credit scoring\n🚗 **Transportation**: Autonomous vehicles, route optimization\n🛍️ **E-commerce**: Recommendation systems, price optimization\n📱 **Technology**: Voice assistants, image recognition, search engines\n🎬 **Entertainment**: Content recommendations, game AI\n\n**Career Opportunities:**\n• Machine Learning Engineer\n• Data Scientist\n• AI Research Scientist\n• MLOps Engineer\n• Business Intelligence Analyst\n\nThe demand for ML professionals is growing exponentially across all industries!"
      }
    ]
  },
  "supervised-learning": {
    id: "supervised-learning",
    title: "Supervised Learning Algorithms",
    type: "text",
    duration: 30,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Understanding Supervised Learning",
        content: "Supervised learning uses labeled training data to learn a mapping from inputs to outputs. It's like learning with a teacher who provides the correct answers during training."
      },
      {
        id: "classification",
        type: "code",
        title: "Classification with Random Forest",
        language: "python",
        content: "# Email spam classification example\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, classification_report\nimport pandas as pd\n\n# Sample email features (word counts, length, etc.)\nX = [\n    [50, 2, 500, 0],   # non-spam: 50 words, 2 links, 500 chars, 0 caps\n    [20, 8, 200, 15],  # spam: 20 words, 8 links, 200 chars, 15 caps\n    [100, 1, 800, 2],  # non-spam\n    [15, 12, 150, 20], # spam\n    [75, 0, 600, 1],   # non-spam\n]\ny = [0, 1, 0, 1, 0]  # 0 = not spam, 1 = spam\n\n# Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n\n# Train model\nrf_model = RandomForestClassifier(n_estimators=100, random_state=42)\nrf_model.fit(X_train, y_train)\n\n# Make predictions\ny_pred = rf_model.predict(X_test)\naccuracy = accuracy_score(y_test, y_pred)\n\nprint(f\"Accuracy: {accuracy:.2%}\")\nprint(\"\\nClassification Report:\")\nprint(classification_report(y_test, y_pred, target_names=['Not Spam', 'Spam']))"
      },
      {
        id: "regression",
        type: "code",
        title: "Regression for Continuous Predictions",
        language: "python",
        content: "# Stock price prediction example\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import mean_squared_error, r2_score\nimport numpy as np\n\n# Sample stock data: [volume, market_cap, previous_price, day_of_week]\nX = np.array([\n    [1000000, 50000000, 100, 1],\n    [1500000, 55000000, 105, 2],\n    [800000, 48000000, 98, 3],\n    [1200000, 52000000, 102, 4],\n    [900000, 49000000, 99, 5]\n])\ny = np.array([101, 107, 96, 104, 98])  # actual stock prices\n\n# Feature scaling\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Train regression model\nregressor = LinearRegression()\nregressor.fit(X_scaled, y)\n\n# Make predictions\ny_pred = regressor.predict(X_scaled)\n\n# Evaluate model\nmse = mean_squared_error(y, y_pred)\nr2 = r2_score(y, y_pred)\n\nprint(f\"Mean Squared Error: {mse:.2f}\")\nprint(f\"R² Score: {r2:.2f}\")\nprint(f\"Feature Importance: {regressor.coef_}\")\n\n# Predict new stock price\nnew_data = scaler.transform([[1100000, 51000000, 103, 1]])\nnew_prediction = regressor.predict(new_data)\nprint(f\"Predicted price: ${new_prediction[0]:.2f}\")"
      },
      {
        id: "model-evaluation",
        type: "text",
        title: "Model Evaluation and Validation",
        content: "**Key Evaluation Metrics:**\n\n📊 **Classification Metrics:**\n• **Accuracy**: Overall correct predictions\n• **Precision**: True positives / (True positives + False positives)\n• **Recall**: True positives / (True positives + False negatives)\n• **F1-Score**: Harmonic mean of precision and recall\n• **ROC-AUC**: Area under the ROC curve\n\n📈 **Regression Metrics:**\n• **MSE**: Mean Squared Error\n• **RMSE**: Root Mean Squared Error\n• **MAE**: Mean Absolute Error\n• **R²**: Coefficient of determination\n\n🔄 **Cross-Validation:**\n```python\nfrom sklearn.model_selection import cross_val_score\nscores = cross_val_score(model, X, y, cv=5)\nprint(f\"CV Accuracy: {scores.mean():.2f} (+/- {scores.std() * 2:.2f})\")\n```\n\n⚠️ **Avoiding Overfitting:**\n• Use train/validation/test splits\n• Apply regularization techniques\n• Monitor learning curves\n• Use ensemble methods\n• Implement early stopping"
      }
    ]
  }
};

// Function to get Machine Learning course content
export const getMachineLearningContent = () => machineLearningContent;