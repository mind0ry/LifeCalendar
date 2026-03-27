package com.myweb.calendar;

import com.myweb.calendar.dto.CalendarDayDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    // GET /api/calendar?year=2025&month=3
    @GetMapping
    public ResponseEntity<Map<LocalDate, CalendarDayDto>> getCalendar(
            @RequestParam int year,
            @RequestParam int month) {

        return ResponseEntity.ok(calendarService.getCalendar(year, month));
    }
}
