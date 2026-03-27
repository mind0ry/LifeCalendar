package com.myweb.stats;

import com.myweb.stats.dto.StatsResponseDto;
import com.myweb.stats.dto.TrendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class StatsController {

    private final StatsService statsService;

    // GET /api/stats?year=2025&month=3 — 월별 통계
    @GetMapping
    public ResponseEntity<StatsResponseDto> getStats(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(statsService.getMonthlyStats(year, month));
    }

    // GET /api/stats/trend?year=2025&month=3 — 최근 6개월 추이
    @GetMapping("/trend")
    public ResponseEntity<List<TrendDto>> getTrend(
            @RequestParam int year,
            @RequestParam int month) {
        return ResponseEntity.ok(statsService.getMonthlyTrend(year, month));
    }
}
