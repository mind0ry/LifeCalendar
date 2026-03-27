package com.myweb.stats;

import com.myweb.stats.dto.StatsResponseDto;
import com.myweb.stats.dto.TrendDto;
import com.myweb.transaction.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsService {

    private final TransactionRepository transactionRepository;

    // 월별 통계 (수입/지출 합계 + 카테고리별 지출)
    @Transactional(readOnly = true)
    public StatsResponseDto getMonthlyStats(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        List<Object[]> typeSums = transactionRepository.sumByType(startDate, endDate);
        long totalIncome = 0;
        long totalExpense = 0;
        for (Object[] row : typeSums) {
            String type = row[0].toString();
            long amount = ((Number) row[1]).longValue();
            if (type.equals("INCOME")) totalIncome = amount;
            else if (type.equals("EXPENSE")) totalExpense = amount;
        }

        List<Object[]> categorySums = transactionRepository.sumExpenseByCategory(startDate, endDate);
        List<StatsResponseDto.CategoryExpense> categoryExpenses = categorySums.stream()
                .map(row -> new StatsResponseDto.CategoryExpense(
                        row[0].toString(),
                        ((Number) row[1]).longValue()
                ))
                .collect(Collectors.toList());

        return new StatsResponseDto(totalIncome, totalExpense, totalIncome - totalExpense, categoryExpenses);
    }

    // 최근 6개월 수입/지출 추이
    @Transactional(readOnly = true)
    public List<TrendDto> getMonthlyTrend(int year, int month) {
        List<TrendDto> result = new ArrayList<>();
        YearMonth current = YearMonth.of(year, month);

        // 5개월 전 ~ 현재월 (총 6개월)
        for (int i = 5; i >= 0; i--) {
            YearMonth ym = current.minusMonths(i);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();

            List<Object[]> typeSums = transactionRepository.sumByType(start, end);
            long income = 0, expense = 0;
            for (Object[] row : typeSums) {
                String type = row[0].toString();
                long amount = ((Number) row[1]).longValue();
                if (type.equals("INCOME")) income = amount;
                else if (type.equals("EXPENSE")) expense = amount;
            }
            result.add(new TrendDto(ym.getYear(), ym.getMonthValue(), income, expense));
        }
        return result;
    }
}
