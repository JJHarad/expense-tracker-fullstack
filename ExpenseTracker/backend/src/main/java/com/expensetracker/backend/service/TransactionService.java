package com.expensetracker.backend.service;

import com.expensetracker.backend.model.Transaction;
import com.expensetracker.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repo;

    public Transaction add(Transaction t) {
        System.out.println("Saving: " + t);
        return repo.save(t);
    }


    public Transaction update(String id, Transaction t) {
        t.setId(id);
        return repo.save(t);
    }

    public List<Transaction> getAll() {
        return repo.findAll();
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}