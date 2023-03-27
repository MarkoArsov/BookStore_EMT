package com.librarian.emt_lab_1.web.rest;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.service.AuthorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthorRestController {

    private final AuthorService service;

    public AuthorRestController(AuthorService service) {
        this.service = service;
    }

    @GetMapping
    public List<Author> findAll() {
        return service.findAll();
    }

}
