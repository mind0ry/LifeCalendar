package com.myweb.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // 달력 통합 API용: 날짜 범위 조회
    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);

    // 통계 API용: 특정 월의 카테고리별 지출 합계
    @Query("SELECT t.category, SUM(t.amount) FROM Transaction t " +
           "WHERE t.date BETWEEN :startDate AND :endDate " +
           "AND t.type = 'EXPENSE' " +
           "GROUP BY t.category")
    List<Object[]> sumExpenseByCategory(@Param("startDate") LocalDate startDate,
                                        @Param("endDate") LocalDate endDate);

    // 통계 API용: 특정 월의 수입/지출 합계
    @Query("SELECT t.type, SUM(t.amount) FROM Transaction t " +
           "WHERE t.date BETWEEN :startDate AND :endDate " +
           "GROUP BY t.type")
    List<Object[]> sumByType(@Param("startDate") LocalDate startDate,
                             @Param("endDate") LocalDate endDate);
}
