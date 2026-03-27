package com.myweb.schedule.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
public class ScheduleRequestDto {

    private String title;           // 일정 제목
    private String description;     // 메모 (선택)
    private LocalDate date;         // 날짜
    private LocalTime startTime;    // 시작 시간 (선택)
    private LocalTime endTime;      // 종료 시간 (선택)
}
