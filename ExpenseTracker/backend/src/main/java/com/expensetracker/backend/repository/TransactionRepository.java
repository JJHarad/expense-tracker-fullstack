package com.expensetracker.backend.repository;

import com.expensetracker.backend.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

}