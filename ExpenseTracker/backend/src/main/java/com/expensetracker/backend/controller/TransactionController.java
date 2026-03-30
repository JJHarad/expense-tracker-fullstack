package com.expensetracker.backend.controller;

import com.expensetracker.backend.model.Transaction;
import com.expensetracker.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public Transaction add(@Valid @RequestBody Transaction t) {
        return service.add(t);
    }

    @GetMapping
    public List<Transaction> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable String id, @RequestBody Transaction t)
    {
        return service.update(id, t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}