package com.librarian.emt_lab_1.repository;

import com.librarian.emt_lab_1.model.Book;
import com.librarian.emt_lab_1.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findAll(Pageable pageable);

    Optional<Book> findByName(String name);

    List<Book> findAllByCategory(Category category);
}
