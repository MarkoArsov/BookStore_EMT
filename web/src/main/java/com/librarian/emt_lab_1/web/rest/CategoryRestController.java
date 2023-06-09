package com.librarian.emt_lab_1.web.rest;

import com.librarian.emt_lab_1.model.Category;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class CategoryRestController {

    @GetMapping
    public List<Category> findAll(){
        return Arrays.stream(Category.values()).toList();
    }
}
