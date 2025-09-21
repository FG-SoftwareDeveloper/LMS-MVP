package com.learnhub.service;

import com.learnhub.model.*;
import com.learnhub.repository.PaymentRepository;
import com.learnhub.repository.CourseRepository;
import com.learnhub.repository.UserRepository;
import com.learnhub.security.UserPrincipal;
import com.stripe.Stripe;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseService courseService;

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public Payment createStripePayment(Long courseId) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        if (course.isFree()) {
            throw new RuntimeException("Course is free, no payment required");
        }
        
        try {
            Stripe.apiKey = stripeApiKey;
            
            // Create Stripe Checkout Session
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(frontendUrl + "/payment/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/payment/cancel")
                    .addLineItem(
                        SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("usd")
                                    .setUnitAmount(course.getPrice().multiply(new BigDecimal("100")).longValue())
                                    .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName(course.getTitle())
                                            .setDescription(course.getShortDescription())
                                            .build()
                                    )
                                    .build()
                            )
                            .build()
                    )
                    .putMetadata("course_id", courseId.toString())
                    .putMetadata("user_id", user.getId().toString())
                    .build();
            
            Session session = Session.create(params);
            
            // Create payment record
            Payment payment = new Payment(user, course, course.getPrice(), PaymentProvider.STRIPE);
            payment.setExternalSessionId(session.getId());
            payment.setStatus(PaymentStatus.PENDING);
            
            return paymentRepository.save(payment);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to create Stripe payment: " + e.getMessage());
        }
    }

    public Payment processStripeWebhook(String sessionId, String paymentIntentId) {
        Payment payment = paymentRepository.findByExternalSessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setPaymentIntentId(paymentIntentId);
        payment.setStatus(PaymentStatus.COMPLETED);
        payment.setProcessedAt(LocalDateTime.now());
        
        // Enroll user in course
        try {
            courseService.enrollUserInCourse(payment.getCourse().getId());
        } catch (Exception e) {
            // User might already be enrolled, ignore
        }
        
        return paymentRepository.save(payment);
    }

    public Payment refundPayment(Long paymentId, BigDecimal refundAmount, String reason) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        if (payment.getStatus() != PaymentStatus.COMPLETED) {
            throw new RuntimeException("Can only refund completed payments");
        }
        
        try {
            Stripe.apiKey = stripeApiKey;
            
            // Create Stripe refund
            Map<String, Object> refundParams = new HashMap<>();
            refundParams.put("payment_intent", payment.getPaymentIntentId());
            refundParams.put("amount", refundAmount.multiply(new BigDecimal("100")).longValue());
            refundParams.put("reason", "requested_by_customer");
            
            com.stripe.model.Refund.create(refundParams);
            
            payment.setRefundAmount(refundAmount);
            payment.setRefundedAt(LocalDateTime.now());
            payment.setStatus(PaymentStatus.REFUNDED);
            
            return paymentRepository.save(payment);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to process refund: " + e.getMessage());
        }
    }
}