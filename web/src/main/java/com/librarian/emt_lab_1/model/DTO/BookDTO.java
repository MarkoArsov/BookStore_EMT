package com.librarian.emt_lab_1.model.DTO;

import com.librarian.emt_lab_1.model.Book;
import lombok.Data;

@Data
public class BookDTO {

    private String name;

    private String category;

    private Long authorId;

    private Integer availableCopies;

    public BookDTO(Book book) {
        this.name = book.getName();
        this.category = book.getCategory().toString();
        this.authorId = book.getAuthor().getId();
        this.availableCopies = book.getAvailableCopies();
    }

    public BookDTO() {

    }
}
