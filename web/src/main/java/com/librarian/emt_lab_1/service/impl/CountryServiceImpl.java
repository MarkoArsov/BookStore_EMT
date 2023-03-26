package com.librarian.emt_lab_1.service.impl;

import com.librarian.emt_lab_1.model.Country;
import com.librarian.emt_lab_1.repository.CountryRepository;
import com.librarian.emt_lab_1.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {

    private final CountryRepository repository;

    public CountryServiceImpl(CountryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Country> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Country> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Optional<Country> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Optional<Country> save(String name, String continent) {
        return Optional.of(repository.save(new Country(name, continent)));
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public void deleteByName(String name) {
        if (repository.findByName(name).isPresent()) repository.delete(repository.findByName(name).get());
    }
}
