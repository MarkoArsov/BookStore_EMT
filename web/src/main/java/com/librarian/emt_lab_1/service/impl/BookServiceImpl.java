package com.librarian.emt_lab_1.service.impl;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.model.Book;
import com.librarian.emt_lab_1.model.Category;
import com.librarian.emt_lab_1.model.DTO.BookDTO;
import com.librarian.emt_lab_1.model.Exceptions.AuthorNotFoundException;
import com.librarian.emt_lab_1.model.Exceptions.BookNotFoundException;
import com.librarian.emt_lab_1.repository.AuthorRepository;
import com.librarian.emt_lab_1.repository.BookRepository;
import com.librarian.emt_lab_1.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;
    private final AuthorRepository authorRepository;

    public BookServiceImpl(BookRepository repository, AuthorRepository authorRepository) {
        this.repository = repository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<Book> findAll() {
        return repository.findAll();
    }

    @Override
    public Page<Book> findAllWithPagination(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Optional<Book> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Book> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Optional<Book> save(String name, Category category, Long authorId, Integer availableCopies) throws AuthorNotFoundException {
        Author author = authorRepository.findById(authorId).orElseThrow(AuthorNotFoundException::new);

        return Optional.of(repository.save(new Book(name, category, author, availableCopies)));
    }

    @Override
    public Optional<Book> save(BookDTO dto) throws AuthorNotFoundException {
        Author author = authorRepository.findById(dto.getAuthorId()).orElseThrow(AuthorNotFoundException::new);
        return Optional.of(repository.save(new Book(dto.getName(), Category.valueOf(dto.getCategory()), author, dto.getAvailableCopies())));
    }

    @Override
    public Optional<Book> edit(Long id, String name, Category category, Long authorId, Integer availableCopies) throws BookNotFoundException, AuthorNotFoundException {
        Book book = this.findById(id).orElseThrow(BookNotFoundException::new);

        book.setName(name);

        book.setCategory(category);

        Author author = authorRepository.findById(authorId).orElseThrow(AuthorNotFoundException::new);
        book.setAuthor(author);

        book.setAvailableCopies(availableCopies);

        return Optional.of(repository.save(book));
    }

    @Override
    public Optional<Book> edit(Long id, BookDTO dto) throws AuthorNotFoundException, BookNotFoundException {
        Book book = this.findById(id).orElseThrow(BookNotFoundException::new);

        book.setName(dto.getName());

        book.setCategory(Category.valueOf(dto.getCategory()));

        Author author = authorRepository.findById(dto.getAuthorId()).orElseThrow(AuthorNotFoundException::new);
        book.setAuthor(author);

        book.setAvailableCopies(dto.getAvailableCopies());

        return Optional.of(repository.save(book));
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Integer markAsTaken(Long id) throws BookNotFoundException {
        Book book = this.findById(id).orElseThrow(BookNotFoundException::new);
        book.setAvailableCopies(book.getAvailableCopies()-1);
        repository.save(book);
        return book.getAvailableCopies();
    }
}
