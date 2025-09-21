package com.learnhub.config;

import com.learnhub.model.Role;
import com.learnhub.model.User;
import com.learnhub.repository.RoleRepository;
import com.learnhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        createRoleIfNotExists("ADMIN", "Administrator role with full access");
        createRoleIfNotExists("INSTRUCTOR", "Instructor role for course management");
        createRoleIfNotExists("STUDENT", "Student role for learning");

        // Create admin user if doesn't exist
        if (!userRepository.existsByEmail("admin@learnhub.com")) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setEmail("admin@learnhub.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setIsEmailVerified(true);
            admin.setIsActive(true);

            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);
            admin.setRoles(roles);

            userRepository.save(admin);
            System.out.println("Created admin user: admin@learnhub.com / admin123");
        }

        // Create instructor user if doesn't exist
        if (!userRepository.existsByEmail("instructor@learnhub.com")) {
            User instructor = new User();
            instructor.setFirstName("John");
            instructor.setLastName("Instructor");
            instructor.setEmail("instructor@learnhub.com");
            instructor.setPassword(passwordEncoder.encode("instructor123"));
            instructor.setIsEmailVerified(true);
            instructor.setIsActive(true);

            Role instructorRole = roleRepository.findByName("INSTRUCTOR").orElseThrow();
            Set<Role> roles = new HashSet<>();
            roles.add(instructorRole);
            instructor.setRoles(roles);

            userRepository.save(instructor);
            System.out.println("Created instructor user: instructor@learnhub.com / instructor123");
        }

        // Create student user if doesn't exist
        if (!userRepository.existsByEmail("student@learnhub.com")) {
            User student = new User();
            student.setFirstName("Jane");
            student.setLastName("Student");
            student.setEmail("student@learnhub.com");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setIsEmailVerified(true);
            student.setIsActive(true);

            Role studentRole = roleRepository.findByName("STUDENT").orElseThrow();
            Set<Role> roles = new HashSet<>();
            roles.add(studentRole);
            student.setRoles(roles);

            userRepository.save(student);
            System.out.println("Created student user: student@learnhub.com / student123");
        }
    }

    private void createRoleIfNotExists(String roleName, String description) {
        if (!roleRepository.existsByName(roleName)) {
            Role role = new Role();
            role.setName(roleName);
            role.setDescription(description);
            roleRepository.save(role);
            System.out.println("Created role: " + roleName);
        }
    }
}