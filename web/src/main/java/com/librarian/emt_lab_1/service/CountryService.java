package com.librarian.emt_lab_1.service;

import com.librarian.emt_lab_1.model.Country;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface CountryService {

    List<Country> findAll();

    Optional<Country> findById(Long id);

    Optional<Country> findByName(String name);

    Optional<Country> save(String name, String continent);

    void deleteById(Long id);

    void deleteByName(String name);
}
