package com.code2job.code2job.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/sanitizer")
    public String sanitizer() {
        return "sanitizer";
    }

    @GetMapping("/resume")
    public String resume() {
        return "resume";
    }

    @GetMapping("/ats")
    public String ats() {
        return "ats";
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }

    @GetMapping("/cover-letter")
    public String coverLetter() {
        return "cover-letter";
    }


}