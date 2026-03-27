package com.myweb.transaction;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long amount;            // 금액 (원 단위, 예: 30000)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;   // INCOME(수입) / EXPENSE(지출)

    @Column(nullable = false)
    private String category;        // 카테고리 (예: 식비, 교통, 급여)

    @Column(columnDefinition = "TEXT")
    private String description;     // 메모 (선택)

    @Column(nullable = false)
    private LocalDate date;         // 날짜

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
