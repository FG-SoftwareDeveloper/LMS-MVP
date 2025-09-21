package com.learnhub.service;

import com.learnhub.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    @Async
    public void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Verify your email - LearnHub");
        message.setText("Hello " + user.getFirstName() + ",\n\n" +
                "Please click the link below to verify your email address:\n" +
                frontendUrl + "/verify-email?token=" + user.getEmailVerificationToken() + "\n\n" +
                "If you didn't create an account, please ignore this email.\n\n" +
                "Best regards,\nLearnHub Team");

        mailSender.send(message);
    }

    @Async
    public void sendPasswordResetEmail(User user, String resetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Reset your password - LearnHub");
        message.setText("Hello " + user.getFirstName() + ",\n\n" +
                "You requested to reset your password. Click the link below to reset it:\n" +
                frontendUrl + "/reset-password?token=" + resetToken + "\n\n" +
                "This link will expire in 24 hours.\n\n" +
                "If you didn't request this, please ignore this email.\n\n" +
                "Best regards,\nLearnHub Team");

        mailSender.send(message);
    }
}