package com.myweb.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StatsResponseDto {

    private long totalIncome;           // 월 수입 합계
    private long totalExpense;          // 월 지출 합계
    private long net;                   // 순수익 (수입 - 지출)
    private List<CategoryExpense> categoryExpenses; // 카테고리별 지출

    @Getter
    @AllArgsConstructor
    public static class CategoryExpense {
        private String category;
        private long amount;
    }
}
