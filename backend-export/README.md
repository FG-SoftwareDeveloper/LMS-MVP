# LMS Gaming Platform - Backend (Java Spring Boot)

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ (optional - H2 included for testing)

### Running the Application

1. **Clone/Extract the backend files**
2. **Navigate to the backend directory**
   ```bash
   cd backend-export
   ```

3. **Run with Maven**
   ```bash
   mvn spring-boot:run
   ```

4. **Or build and run JAR**
   ```bash
   mvn clean package
   java -jar target/lms-gaming-platform-0.0.1-SNAPSHOT.jar
   ```

### 🌐 Access Points

- **Application**: http://localhost:8080
- **API Documentation**: http://localhost:8080/swagger-ui.html
- **Database Console**: http://localhost:8080/h2-console
  - URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

### 👥 Default Users

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@learnhub.com | admin123 |
| Instructor | instructor@learnhub.com | instructor123 |
| Student | student@learnhub.com | student123 |

### 🔧 Configuration

#### For MySQL (Production)
Update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/lms_gaming_platform
    username: your_username
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
```

#### Email Configuration
Update email settings in `application.yml`:

```yaml
spring:
  mail:
    host: your-smtp-host
    port: 587
    username: your-email@domain.com
    password: your-app-password
```

### 📊 Features Included

- ✅ **Authentication**: JWT-based with refresh tokens
- ✅ **User Management**: Registration, verification, password reset
- ✅ **Course System**: Full CRUD with modules and lessons
- ✅ **Gamification**: Points, levels, achievements, leaderboards
- ✅ **Assessments**: Question bank with auto/manual grading
- ✅ **Communication**: Forums, announcements, private messaging
- ✅ **Analytics**: Student/instructor dashboards with charts
- ✅ **Administration**: Content moderation, user management
- ✅ **Integrations**: Stripe payments, live sessions
- ✅ **API Layer**: RESTful APIs with Swagger documentation

### 🧪 Testing

Run tests:
```bash
mvn test
```

### 📝 API Endpoints

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/forgot-password` - Password reset

#### Courses
- `GET /api/v1/courses` - List courses
- `POST /api/v1/courses` - Create course (Instructor/Admin)
- `GET /api/v1/courses/{id}` - Get course details
- `POST /api/v1/courses/{id}/enroll` - Enroll in course

#### Games
- `GET /api/v1/games` - List games
- `POST /api/v1/games/{id}/sessions` - Start game session
- `PUT /api/v1/games/sessions/{id}` - Update game session

#### Assessments
- `GET /api/v1/assessments` - List assessments
- `POST /api/v1/assessments/{id}/attempts` - Start assessment
- `POST /api/v1/assessments/attempts/{id}/submit` - Submit assessment

### 🔍 Troubleshooting

#### Port Already in Use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

#### Database Issues
- Check H2 console for table structure
- Verify data initialization in logs
- Check `DataInitializer.java` for default data

#### Email Issues
- Verify SMTP configuration
- Check firewall settings
- Use app-specific passwords for Gmail

### 📁 Project Structure

```
backend-export/
├── src/main/java/com/learnhub/
│   ├── config/          # Configuration classes
│   ├── controller/      # REST controllers
│   ├── dto/            # Data transfer objects
│   ├── model/          # JPA entities
│   ├── repository/     # Data repositories
│   ├── security/       # Security components
│   └── service/        # Business logic
├── src/main/resources/
│   ├── templates/      # Thymeleaf views
│   ├── static/         # CSS, JS, images
│   └── application.yml # Configuration
└── pom.xml            # Maven dependencies
```

### 🆘 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify Java 17+ is installed: `java -version`
3. Ensure Maven is working: `mvn -version`
4. Check if port 8080 is available