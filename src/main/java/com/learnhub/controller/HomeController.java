package com.learnhub.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("message", "Welcome to LearnHub Gaming Platform!");
        return "dashboard";
    }

    @GetMapping("/test")
    public String test(Model model) {
        model.addAttribute("message", "Spring Boot is working correctly!");
        return "test";
    }
}