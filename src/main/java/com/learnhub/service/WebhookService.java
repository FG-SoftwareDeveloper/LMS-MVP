package com.learnhub.service;

import com.learnhub.model.Webhook;
import com.learnhub.model.WebhookEvent;
import com.learnhub.repository.WebhookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class WebhookService {

    @Autowired
    private WebhookRepository webhookRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Async
    public void triggerWebhooks(WebhookEvent event, Map<String, Object> payload) {
        List<Webhook> webhooks = webhookRepository.findByEventAndIsActiveTrue(event);
        
        for (Webhook webhook : webhooks) {
            try {
                sendWebhook(webhook, payload);
                
                webhook.setLastSuccessAt(LocalDateTime.now());
                webhook.setTotalCalls(webhook.getTotalCalls() + 1);
                webhookRepository.save(webhook);
                
            } catch (Exception e) {
                handleWebhookFailure(webhook, e);
            }
        }
    }

    private void sendWebhook(Webhook webhook, Map<String, Object> payload) {
        try {
            // Prepare webhook payload
            Map<String, Object> webhookPayload = new HashMap<>();
            webhookPayload.put("event", webhook.getEvent().toString());
            webhookPayload.put("timestamp", LocalDateTime.now().toString());
            webhookPayload.put("data", payload);
            
            String jsonPayload = objectMapper.writeValueAsString(webhookPayload);
            
            // Create headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            // Add signature if secret key is provided
            if (webhook.getSecretKey() != null) {
                String signature = generateSignature(jsonPayload, webhook.getSecretKey());
                headers.set("X-Webhook-Signature", signature);
            }
            
            HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
            
            // Send webhook with timeout
            ResponseEntity<String> response = restTemplate.exchange(
                webhook.getUrl(),
                HttpMethod.POST,
                entity,
                String.class
            );
            
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Webhook returned non-2xx status: " + response.getStatusCode());
            }
            
            webhook.setLastTriggeredAt(LocalDateTime.now());
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to send webhook: " + e.getMessage());
        }
    }

    private String generateSignature(String payload, String secretKey) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            return "sha256=" + Base64.getEncoder().encodeToString(hash);
            
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Failed to generate webhook signature: " + e.getMessage());
        }
    }

    private void handleWebhookFailure(Webhook webhook, Exception e) {
        webhook.setFailureCount(webhook.getFailureCount() + 1);
        webhook.setTotalCalls(webhook.getTotalCalls() + 1);
        
        // Disable webhook after too many failures
        if (webhook.getFailureCount() >= 10) {
            webhook.setIsActive(false);
        }
        
        webhookRepository.save(webhook);
    }

    public Webhook createWebhook(Webhook webhook) {
        return webhookRepository.save(webhook);
    }

    public List<Webhook> getAllWebhooks() {
        return webhookRepository.findAll();
    }

    public void testWebhook(Long webhookId) {
        Webhook webhook = webhookRepository.findById(webhookId)
                .orElseThrow(() -> new RuntimeException("Webhook not found"));
        
        Map<String, Object> testPayload = new HashMap<>();
        testPayload.put("test", true);
        testPayload.put("message", "This is a test webhook");
        
        try {
            sendWebhook(webhook, testPayload);
        } catch (Exception e) {
            throw new RuntimeException("Webhook test failed: " + e.getMessage());
        }
    }
}