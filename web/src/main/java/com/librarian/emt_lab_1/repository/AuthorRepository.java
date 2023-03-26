package com.librarian.emt_lab_1.repository;

import com.librarian.emt_lab_1.model.Author;
import org.apache.logging.log4j.message.StringFormattedMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    Optional<Author> findByNameAndSurname(String name, String surname);
}
