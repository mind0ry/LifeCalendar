package com.myweb.calendar.dto;

import com.myweb.schedule.dto.ScheduleResponseDto;
import com.myweb.transaction.dto.TransactionResponseDto;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

// 달력의 하루치 데이터 (일정 + 수입/지출 묶음)
@Getter
public class CalendarDayDto {

    private final List<ScheduleResponseDto> schedules = new ArrayList<>();
    private final List<TransactionResponseDto> transactions = new ArrayList<>();
}
