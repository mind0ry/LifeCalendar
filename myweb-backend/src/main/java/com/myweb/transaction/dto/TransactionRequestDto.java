package com.myweb.transaction.dto;

import com.myweb.transaction.TransactionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TransactionRequestDto {

    private Long amount;            // 금액
    private TransactionType type;   // INCOME 또는 EXPENSE
    private String category;        // 카테고리
    private String description;     // 메모 (선택)
    private LocalDate date;         // 날짜
}
