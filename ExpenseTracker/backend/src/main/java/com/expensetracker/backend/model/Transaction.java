package com.expensetracker.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Data
@Document(collection = "transactions")
public class Transaction {

    @Id
    private String id;

    @NotBlank
    private String title;

    @NotNull
    private Double amount;

    @NotBlank
    private String type; // INCOME / EXPENSE

    @NotBlank
    private String category;

    @NotNull
    private LocalDate date;
}