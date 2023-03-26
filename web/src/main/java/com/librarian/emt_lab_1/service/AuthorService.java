package com.librarian.emt_lab_1.service;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.model.Country;
import com.librarian.emt_lab_1.model.Exceptions.CountryNotFoundException;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> findAll();

    Optional<Author> findById(Long id);

    Optional<Author> findByNameAndSurname(String name, String Surname);

    Optional<Author> save(String name, String surname, Long countryId) throws CountryNotFoundException;

    void deleteById(Long id);

}
