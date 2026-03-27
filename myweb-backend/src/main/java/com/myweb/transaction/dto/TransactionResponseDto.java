package com.myweb.transaction.dto;

import com.myweb.transaction.Transaction;
import com.myweb.transaction.TransactionType;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class TransactionResponseDto {

    private Long id;
    private Long amount;
    private TransactionType type;
    private String category;
    private String description;
    private LocalDate date;
    private LocalDateTime createdAt;

    // Entity → DTO 변환
    public TransactionResponseDto(Transaction transaction) {
        this.id = transaction.getId();
        this.amount = transaction.getAmount();
        this.type = transaction.getType();
        this.category = transaction.getCategory();
        this.description = transaction.getDescription();
        this.date = transaction.getDate();
        this.createdAt = transaction.getCreatedAt();
    }
}
