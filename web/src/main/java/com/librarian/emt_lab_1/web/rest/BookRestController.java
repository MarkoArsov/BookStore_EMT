package com.librarian.emt_lab_1.web.rest;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.model.Book;
import com.librarian.emt_lab_1.model.Category;
import com.librarian.emt_lab_1.model.DTO.BookDTO;
import com.librarian.emt_lab_1.model.Exceptions.AuthorNotFoundException;
import com.librarian.emt_lab_1.model.Exceptions.BookNotFoundException;
import com.librarian.emt_lab_1.model.Exceptions.CountryNotFoundException;
import com.librarian.emt_lab_1.service.AuthorService;
import com.librarian.emt_lab_1.service.BookService;
import com.librarian.emt_lab_1.service.CountryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class BookRestController {

    private final BookService service;
    private final AuthorService authorService;
    private final CountryService countryService;

    public BookRestController(BookService service, AuthorService authorService, CountryService countryService) throws CountryNotFoundException, AuthorNotFoundException {
        this.service = service;
        this.authorService = authorService;
        this.countryService = countryService;

        this.countryService.save("Macedonia", "Europe");
        this.authorService.save("Marko", "Arsov", 1L);
        this.service.save("Marko's Book", Category.FANTASY, 1L, 10);
    }

    @GetMapping
    public List<Book> findAll() {
        return service.findAll();
    }

    @GetMapping("/pagination")
    public List<Book> findAllWithPagination(Pageable pageable) {
        //example: .../api/books/pagination?page=x&size=y
        return service.findAllWithPagination(pageable).getContent();
    }

    @GetMapping("{id}")
    public ResponseEntity<Book> findById(@PathVariable Long id) {
        return service.findById(id)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("{id}/author")
    public ResponseEntity<Author> findAuthorByBookId(@PathVariable Long id) {
        return service.findById(id)
                .map(book -> ResponseEntity.ok().body(book.getAuthor()))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> save(@RequestBody BookDTO bookDTO) throws AuthorNotFoundException {
        return service.save(bookDTO)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("{id}")
    public ResponseEntity<Book> edit(@PathVariable Long id, @RequestBody BookDTO bookDTO) throws AuthorNotFoundException, BookNotFoundException {
        return service.edit(id, bookDTO)
                .map(book -> ResponseEntity.ok().body(book))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/mark/{id}")
    public ResponseEntity<Integer> markAsTaken(@PathVariable Long id) throws BookNotFoundException {
        return ResponseEntity.ok().body(service.markAsTaken(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteById(@PathVariable Long id) {
        this.service.deleteById(id);
        if (this.service.findById(id).isEmpty()) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
