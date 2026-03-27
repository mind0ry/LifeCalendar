package com.myweb.transaction;

import com.myweb.transaction.dto.TransactionRequestDto;
import com.myweb.transaction.dto.TransactionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    // 수입/지출 생성
    @Transactional
    public TransactionResponseDto create(TransactionRequestDto dto) {
        Transaction transaction = new Transaction();
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDescription(dto.getDescription());
        transaction.setDate(dto.getDate());

        return new TransactionResponseDto(transactionRepository.save(transaction));
    }

    // 단건 조회
    @Transactional(readOnly = true)
    public TransactionResponseDto getById(Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("내역을 찾을 수 없습니다. id=" + id));
        return new TransactionResponseDto(transaction);
    }

    // 수정
    @Transactional
    public TransactionResponseDto update(Long id, TransactionRequestDto dto) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("내역을 찾을 수 없습니다. id=" + id));

        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDescription(dto.getDescription());
        transaction.setDate(dto.getDate());

        return new TransactionResponseDto(transaction);
    }

    // 삭제
    @Transactional
    public void delete(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("내역을 찾을 수 없습니다. id=" + id);
        }
        transactionRepository.deleteById(id);
    }

    // 달력 통합 API 전용: 날짜 범위로 내역 목록 반환
    @Transactional(readOnly = true)
    public List<Transaction> findByDateBetween(LocalDate start, LocalDate end) {
        return transactionRepository.findByDateBetween(start, end);
    }
}
