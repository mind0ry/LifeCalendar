package com.myweb.calendar;

import com.myweb.calendar.dto.CalendarDayDto;
import com.myweb.schedule.Schedule;
import com.myweb.schedule.ScheduleService;
import com.myweb.schedule.dto.ScheduleResponseDto;
import com.myweb.transaction.Transaction;
import com.myweb.transaction.TransactionService;
import com.myweb.transaction.dto.TransactionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final ScheduleService scheduleService;
    private final TransactionService transactionService;

    @Transactional(readOnly = true)
    public Map<LocalDate, CalendarDayDto> getCalendar(int year, int month) {

        // 해당 월의 첫째 날 ~ 마지막 날 계산
        YearMonth yearMonth = YearMonth.of(year, month);
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        // 일정 및 수입/지출 내역 조회
        List<Schedule> schedules = scheduleService.findByDateBetween(startDate, endDate);
        List<Transaction> transactions = transactionService.findByDateBetween(startDate, endDate);

        // 날짜 순서대로 정렬되도록 TreeMap 사용
        Map<LocalDate, CalendarDayDto> calendarMap = new TreeMap<>();

        // 일정을 날짜별로 묶기
        for (Schedule schedule : schedules) {
            CalendarDayDto dayDto = calendarMap.computeIfAbsent(
                    schedule.getDate(), k -> new CalendarDayDto()
            );
            dayDto.getSchedules().add(new ScheduleResponseDto(schedule));
        }

        // 수입/지출을 날짜별로 묶기
        for (Transaction transaction : transactions) {
            CalendarDayDto dayDto = calendarMap.computeIfAbsent(
                    transaction.getDate(), k -> new CalendarDayDto()
            );
            dayDto.getTransactions().add(new TransactionResponseDto(transaction));
        }

        return calendarMap;
    }
}
