// Python for Data Science course content
export const pythonDataScienceContent: { [key: string]: any } = {
  "python-basics-for-data": {
    id: "python-basics-for-data",
    title: "Python Basics for Data Science",
    type: "text",
    duration: 25,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Welcome to Python for Data Science!",
        content: "Python has become the most popular programming language for data science, and for good reason. Its simple syntax, powerful libraries, and vibrant community make it the perfect choice for data analysis, machine learning, and scientific computing."
      },
      {
        id: "why-python",
        type: "text",
        title: "Why Python for Data Science?",
        content: "Python dominates the data science landscape because of:\n\n📊 **Rich Ecosystem**: Libraries like pandas, numpy, matplotlib, and scikit-learn\n🧠 **Machine Learning**: TensorFlow, PyTorch, and Keras for deep learning\n📈 **Visualization**: Matplotlib, seaborn, and plotly for stunning charts\n🔢 **Numerical Computing**: NumPy for fast mathematical operations\n🐼 **Data Manipulation**: Pandas for data cleaning and analysis\n💼 **Industry Standard**: Used by Google, Netflix, Spotify, and more\n\nPython's readability and extensive libraries make complex data tasks surprisingly simple!"
      },
      {
        id: "basic-syntax",
        type: "code",
        title: "Essential Python Syntax for Data Science",
        language: "python",
        content: "# Python basics every data scientist needs to know\n\n# Variables and data types\nname = \"Data Scientist\"\nage = 30\nsalary = 95000.50\nis_employed = True\n\n# Lists (great for storing data)\nscores = [85, 92, 78, 96, 88]\ncities = ['New York', 'London', 'Tokyo', 'Sydney']\n\n# Dictionaries (key-value pairs)\nstudent = {\n    'name': 'Alice',\n    'grade': 95,\n    'subjects': ['Math', 'Science', 'English']\n}\n\n# Basic operations\naverage_score = sum(scores) / len(scores)\nprint(f\"Average score: {average_score}\")\n\n# List comprehensions (very Pythonic!)\nsquared_scores = [score**2 for score in scores]\nprint(f\"Squared scores: {squared_scores}\")"
      },
      {
        id: "essential-libraries",
        type: "text",
        title: "Essential Data Science Libraries",
        content: "**Core Libraries You'll Master:**\n\n🔢 **NumPy**: Foundation for numerical computing\n- Multi-dimensional arrays\n- Mathematical functions\n- Linear algebra operations\n\n🐼 **Pandas**: Data manipulation and analysis\n- DataFrames and Series\n- Data cleaning and transformation\n- Reading/writing various file formats\n\n📊 **Matplotlib**: Basic plotting and visualization\n- Line plots, bar charts, histograms\n- Customizable charts and graphs\n\n🎨 **Seaborn**: Statistical data visualization\n- Beautiful default styles\n- Advanced statistical plots\n\n🤖 **Scikit-learn**: Machine learning made simple\n- Classification and regression\n- Clustering and dimensionality reduction\n- Model evaluation and selection"
      }
    ]
  },
  "numpy-arrays": {
    id: "numpy-arrays",
    title: "NumPy Arrays and Mathematical Operations",
    type: "text",
    duration: 30,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Introduction to NumPy",
        content: "NumPy (Numerical Python) is the foundation of the Python data science ecosystem. It provides fast, memory-efficient multidimensional arrays and mathematical functions that operate on entire arrays without writing loops."
      },
      {
        id: "creating-arrays",
        type: "code",
        title: "Creating and Working with NumPy Arrays",
        language: "python",
        content: "import numpy as np\n\n# Creating arrays from lists\narr1 = np.array([1, 2, 3, 4, 5])\narr2 = np.array([[1, 2, 3], [4, 5, 6]])\n\nprint(f\"1D Array: {arr1}\")\nprint(f\"2D Array:\\n{arr2}\")\nprint(f\"Shape: {arr2.shape}\")\nprint(f\"Data type: {arr1.dtype}\")\n\n# Creating special arrays\nzeros = np.zeros((3, 4))  # 3x4 array of zeros\nones = np.ones((2, 3))    # 2x3 array of ones\nrange_arr = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]\nlinspace = np.linspace(0, 1, 5)  # 5 evenly spaced numbers from 0 to 1\n\nprint(f\"Zeros:\\n{zeros}\")\nprint(f\"Range array: {range_arr}\")\nprint(f\"Linspace: {linspace}\")"
      },
      {
        id: "array-operations",
        type: "code",
        title: "Mathematical Operations on Arrays",
        language: "python",
        content: "import numpy as np\n\n# Sample data: test scores for 5 students in 3 subjects\nscores = np.array([\n    [85, 92, 78],  # Student 1\n    [90, 88, 95],  # Student 2\n    [76, 85, 82],  # Student 3\n    [88, 91, 87],  # Student 4\n    [92, 89, 94]   # Student 5\n])\n\nprint(f\"Test Scores:\\n{scores}\")\n\n# Statistical operations\nprint(f\"\\nOverall average: {np.mean(scores):.1f}\")\nprint(f\"Average per student: {np.mean(scores, axis=1)}\")\nprint(f\"Average per subject: {np.mean(scores, axis=0)}\")\n\n# More statistics\nprint(f\"\\nHighest score: {np.max(scores)}\")\nprint(f\"Lowest score: {np.min(scores)}\")\nprint(f\"Standard deviation: {np.std(scores):.2f}\")\n\n# Element-wise operations\nbonused_scores = scores + 5  # Add 5 points to all scores\nweighted_scores = scores * 1.1  # 10% bonus\n\nprint(f\"\\nWith 5-point bonus:\\n{bonused_scores}\")\nprint(f\"With 10% bonus:\\n{weighted_scores}\")"
      },
      {
        id: "indexing-slicing",
        type: "code",
        title: "Array Indexing and Slicing",
        language: "python",
        content: "import numpy as np\n\n# Sample sales data: [Week1, Week2, Week3, Week4]\nsales_data = np.array([\n    [1200, 1350, 1180, 1420],  # Product A\n    [980, 1100, 1050, 1200],   # Product B\n    [1500, 1620, 1580, 1700],  # Product C\n    [750, 820, 790, 850]       # Product D\n])\n\nprint(f\"Sales Data:\\n{sales_data}\")\n\n# Basic indexing\nprint(f\"\\nProduct A, Week 1 sales: {sales_data[0, 0]}\")\nprint(f\"Product C, Week 3 sales: {sales_data[2, 2]}\")\n\n# Slicing\nprint(f\"\\nFirst two products: \\n{sales_data[:2]}\")\nprint(f\"Last two weeks: \\n{sales_data[:, -2:]}\")\nprint(f\"Product B and C, Week 2-3: \\n{sales_data[1:3, 1:3]}\")\n\n# Boolean indexing\nhigh_sales = sales_data > 1300\nprint(f\"\\nWeeks with sales > 1300:\\n{high_sales}\")\nprint(f\"Actual high sales values: {sales_data[high_sales]}\")\n\n# Advanced indexing\nprint(f\"\\nTotal sales per product: {np.sum(sales_data, axis=1)}\")\nprint(f\"Total sales per week: {np.sum(sales_data, axis=0)}\")"
      },
      {
        id: "practical-example",
        type: "text",
        title: "Real-World Example: Stock Price Analysis",
        content: "**NumPy in Action: Analyzing Stock Prices**\n\nImagine you're analyzing daily stock prices for a portfolio. With NumPy, you can:\n\n📈 **Calculate Returns**: Compute daily percentage changes\n📊 **Risk Metrics**: Calculate volatility and standard deviations\n🎯 **Moving Averages**: Smooth out price fluctuations\n📉 **Performance Metrics**: Compare multiple stocks efficiently\n\n**Key Benefits:**\n• **Speed**: NumPy operations are 10-100x faster than pure Python\n• **Memory**: Efficient storage of large datasets\n• **Broadcasting**: Perform operations on arrays of different shapes\n• **Integration**: Works seamlessly with pandas and other libraries\n\nMastering NumPy is essential for any data science workflow!"
      }
    ]
  },
  "pandas-dataframes": {
    id: "pandas-dataframes",
    title: "Pandas DataFrames for Data Analysis",
    type: "text",
    duration: 35,
    content: [
      {
        id: "intro",
        type: "text",
        title: "Introduction to Pandas",
        content: "Pandas is the most important library for data manipulation and analysis in Python. It provides two main data structures: Series (1-dimensional) and DataFrame (2-dimensional), which can handle virtually any type of data you'll encounter in data science."
      },
      {
        id: "creating-dataframes",
        type: "code",
        title: "Creating and Exploring DataFrames",
        language: "python",
        content: "import pandas as pd\nimport numpy as np\n\n# Creating a DataFrame from a dictionary\nemployee_data = {\n    'Name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],\n    'Department': ['Engineering', 'Marketing', 'Engineering', 'Sales', 'Marketing'],\n    'Salary': [95000, 65000, 87000, 72000, 68000],\n    'Years_Experience': [5, 3, 4, 6, 2],\n    'Performance_Rating': [4.2, 3.8, 4.5, 4.0, 3.9]\n}\n\ndf = pd.DataFrame(employee_data)\nprint(\"Employee DataFrame:\")\nprint(df)\n\n# Basic information about the DataFrame\nprint(f\"\\nDataFrame shape: {df.shape}\")\nprint(f\"Column names: {list(df.columns)}\")\nprint(f\"Data types:\\n{df.dtypes}\")\n\n# Quick statistics\nprint(f\"\\nDescriptive statistics:\")\nprint(df.describe())"
      },
      {
        id: "data-selection",
        type: "code",
        title: "Selecting and Filtering Data",
        language: "python",
        content: "# Continuing with our employee DataFrame\n\n# Selecting columns\nprint(\"Names and Salaries:\")\nprint(df[['Name', 'Salary']])\n\n# Selecting rows by condition\nhigh_earners = df[df['Salary'] > 70000]\nprint(f\"\\nEmployees earning > $70,000:\")\nprint(high_earners)\n\n# Multiple conditions\nsenior_engineers = df[\n    (df['Department'] == 'Engineering') & \n    (df['Years_Experience'] >= 4)\n]\nprint(f\"\\nSenior Engineers:\")\nprint(senior_engineers)\n\n# Selecting specific rows and columns\nprint(f\"\\nFirst 3 employees' names and departments:\")\nprint(df.loc[0:2, ['Name', 'Department']])\n\n# Using iloc for position-based selection\nprint(f\"\\nFirst 2 rows, last 2 columns:\")\nprint(df.iloc[:2, -2:])\n\n# Sorting data\nsorted_by_salary = df.sort_values('Salary', ascending=False)\nprint(f\"\\nEmployees sorted by salary (highest to lowest):\")\nprint(sorted_by_salary[['Name', 'Salary']])"
      },
      {
        id: "data-manipulation",
        type: "code",
        title: "Data Cleaning and Transformation",
        language: "python",
        content: "# Sample sales data with some issues\nsales_data = {\n    'Date': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],\n    'Product': ['Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Laptop'],\n    'Price': [999.99, 25.50, 79.99, 299.99, 1199.99],\n    'Quantity': [2, 5, 3, 1, 1],\n    'Customer_Rating': [4.5, 4.2, None, 4.8, 4.1]  # Missing value\n}\n\nsales_df = pd.DataFrame(sales_data)\nprint(\"Original Sales Data:\")\nprint(sales_df)\nprint(f\"\\nInfo about missing values:\")\nprint(sales_df.isnull().sum())\n\n# Convert Date column to datetime\nsales_df['Date'] = pd.to_datetime(sales_df['Date'])\n\n# Handle missing values\nsales_df['Customer_Rating'].fillna(sales_df['Customer_Rating'].mean(), inplace=True)\n\n# Create new columns\nsales_df['Total_Revenue'] = sales_df['Price'] * sales_df['Quantity']\nsales_df['High_Value_Sale'] = sales_df['Total_Revenue'] > 500\n\nprint(f\"\\nCleaned and Enhanced Data:\")\nprint(sales_df)\n\n# Group by operations\nproduct_summary = sales_df.groupby('Product').agg({\n    'Total_Revenue': 'sum',\n    'Quantity': 'sum',\n    'Customer_Rating': 'mean'\n}).round(2)\n\nprint(f\"\\nProduct Summary:\")\nprint(product_summary)"
      },
      {
        id: "real-world-example",
        type: "text",
        title: "Real-World Data Analysis Workflow",
        content: "**Complete Data Analysis Example:**\n\n📊 **1. Data Loading**\n```python\ndf = pd.read_csv('sales_data.csv')\ndf = pd.read_excel('financial_report.xlsx')\n```\n\n🧹 **2. Data Cleaning**\n- Handle missing values with `fillna()` or `dropna()`\n- Remove duplicates with `drop_duplicates()`\n- Fix data types with `astype()`\n\n🔍 **3. Exploratory Data Analysis**\n- Use `describe()` for statistical summary\n- Use `value_counts()` for categorical data\n- Use `corr()` for correlation analysis\n\n📈 **4. Data Transformation**\n- Create new features with calculations\n- Group and aggregate data with `groupby()`\n- Merge datasets with `merge()` or `join()`\n\n💾 **5. Export Results**\n```python\ndf.to_csv('cleaned_data.csv', index=False)\ndf.to_excel('analysis_results.xlsx')\n```\n\n**Pro Tips:**\n• Always examine your data first with `df.head()`, `df.info()`, `df.describe()`\n• Use method chaining for elegant data pipelines\n• Leverage pandas' powerful string methods for text data\n• Master boolean indexing for complex filtering"
      }
    ]
  }
};

// Function to get Python Data Science course content
export const getPythonDataScienceContent = () => pythonDataScienceContent;