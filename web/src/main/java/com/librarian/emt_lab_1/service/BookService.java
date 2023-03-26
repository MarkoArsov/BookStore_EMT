package com.librarian.emt_lab_1.service;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.model.Book;
import com.librarian.emt_lab_1.model.Category;
import com.librarian.emt_lab_1.model.Country;
import com.librarian.emt_lab_1.model.DTO.BookDTO;
import com.librarian.emt_lab_1.model.Exceptions.AuthorNotFoundException;
import com.librarian.emt_lab_1.model.Exceptions.BookNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> findAll();

    Page<Book> findAllWithPagination(Pageable pageable);

    Optional<Book> findById(Long id);

    Optional<Book> findByName(String name);

    Optional<Book> save(String name, Category category, Long authorId, Integer availableCopies) throws AuthorNotFoundException;

    Optional<Book> save(BookDTO dto) throws AuthorNotFoundException;

    Optional<Book> edit(Long id, String name, Category category, Long authorId, Integer availableCopies) throws BookNotFoundException, AuthorNotFoundException;

    Optional<Book> edit(Long id, BookDTO dto) throws AuthorNotFoundException, BookNotFoundException;

    void deleteById(Long id);

    Integer markAsTaken(Long id) throws BookNotFoundException;
}
