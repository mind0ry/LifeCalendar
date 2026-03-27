package com.myweb.schedule;

import com.myweb.schedule.dto.ScheduleRequestDto;
import com.myweb.schedule.dto.ScheduleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    // 일정 생성
    @Transactional
    public ScheduleResponseDto create(ScheduleRequestDto dto) {
        Schedule schedule = new Schedule();
        schedule.setTitle(dto.getTitle());
        schedule.setDescription(dto.getDescription());
        schedule.setDate(dto.getDate());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());

        return new ScheduleResponseDto(scheduleRepository.save(schedule));
    }

    // 단건 조회
    @Transactional(readOnly = true)
    public ScheduleResponseDto getById(Long id) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("일정을 찾을 수 없습니다. id=" + id));
        return new ScheduleResponseDto(schedule);
    }

    // 수정
    @Transactional
    public ScheduleResponseDto update(Long id, ScheduleRequestDto dto) {
        Schedule schedule = scheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("일정을 찾을 수 없습니다. id=" + id));

        schedule.setTitle(dto.getTitle());
        schedule.setDescription(dto.getDescription());
        schedule.setDate(dto.getDate());
        schedule.setStartTime(dto.getStartTime());
        schedule.setEndTime(dto.getEndTime());

        return new ScheduleResponseDto(schedule);
    }

    // 삭제
    @Transactional
    public void delete(Long id) {
        if (!scheduleRepository.existsById(id)) {
            throw new RuntimeException("일정을 찾을 수 없습니다. id=" + id);
        }
        scheduleRepository.deleteById(id);
    }

    // 달력 통합 API 전용: 날짜 범위로 일정 목록 반환
    @Transactional(readOnly = true)
    public List<Schedule> findByDateBetween(LocalDate start, LocalDate end) {
        return scheduleRepository.findByDateBetween(start, end);
    }
}
