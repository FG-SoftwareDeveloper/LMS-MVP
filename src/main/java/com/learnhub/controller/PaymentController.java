package com.learnhub.controller;

import com.learnhub.dto.ApiResponse;
import com.learnhub.model.Payment;
import com.learnhub.service.PaymentService;
import com.learnhub.service.WebhookService;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payments")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Payment", description = "Payment processing endpoints")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private WebhookService webhookService;

    @PostMapping("/stripe/create-session")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    @Operation(summary = "Create Stripe payment session for course enrollment")
    public ResponseEntity<?> createStripeSession(@RequestParam Long courseId) {
        try {
            Payment payment = paymentService.createStripePayment(courseId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", payment.getExternalSessionId());
            response.put("paymentId", payment.getId());
            
            return ResponseEntity.ok(new ApiResponse(true, "Payment session created", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/stripe/webhook")
    @Operation(summary = "Handle Stripe webhook events")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                     @RequestHeader("Stripe-Signature") String signature) {
        try {
            // Verify webhook signature (simplified for demo)
            Event event = Event.GSON.fromJson(payload, Event.class);
            
            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
                if (session != null) {
                    paymentService.processStripeWebhook(session.getId(), session.getPaymentIntent());
                    
                    // Trigger internal webhooks
                    Map<String, Object> webhookPayload = new HashMap<>();
                    webhookPayload.put("sessionId", session.getId());
                    webhookPayload.put("amount", session.getAmountTotal());
                    webhookService.triggerWebhooks(com.learnhub.model.WebhookEvent.PAYMENT_COMPLETED, webhookPayload);
                }
            }
            
            return ResponseEntity.ok("Webhook processed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Webhook processing failed");
        }
    }

    @PostMapping("/{paymentId}/refund")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Process payment refund")
    public ResponseEntity<?> refundPayment(@PathVariable Long paymentId,
                                         @RequestParam String reason) {
        try {
            // For demo, refund full amount
            Payment payment = paymentService.refundPayment(paymentId, null, reason);
            return ResponseEntity.ok(new ApiResponse(true, "Refund processed successfully", payment));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}