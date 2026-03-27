package com.myweb.schedule;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    // 달력 통합 API에서 사용: 특정 날짜 범위의 일정 조회
    List<Schedule> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
