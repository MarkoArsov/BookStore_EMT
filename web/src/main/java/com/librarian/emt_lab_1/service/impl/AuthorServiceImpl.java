package com.librarian.emt_lab_1.service.impl;

import com.librarian.emt_lab_1.model.Author;
import com.librarian.emt_lab_1.model.Country;
import com.librarian.emt_lab_1.model.Exceptions.CountryNotFoundException;
import com.librarian.emt_lab_1.repository.AuthorRepository;
import com.librarian.emt_lab_1.repository.CountryRepository;
import com.librarian.emt_lab_1.service.AuthorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository repository;
    private final CountryRepository countryRepository;

    public AuthorServiceImpl(AuthorRepository repository, CountryRepository countryRepository) {
        this.repository = repository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<Author> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Author> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Author> findByNameAndSurname(String name, String surname) {
        return repository.findByNameAndSurname(name, surname);
    }

    @Override
    public Optional<Author> save(String name, String surname, Long countryId) throws CountryNotFoundException {
        Country country = countryRepository.findById(countryId).orElseThrow(CountryNotFoundException::new);
        return Optional.of(repository.save(new Author(name, surname, country)));
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

}
