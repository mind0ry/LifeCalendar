package com.myweb.transaction;

import com.myweb.transaction.dto.TransactionRequestDto;
import com.myweb.transaction.dto.TransactionResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    // POST /api/transactions — 수입/지출 생성
    @PostMapping
    public ResponseEntity<TransactionResponseDto> create(@RequestBody TransactionRequestDto dto) {
        return ResponseEntity.ok(transactionService.create(dto));
    }

    // GET /api/transactions/{id} — 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(transactionService.getById(id));
    }

    // PUT /api/transactions/{id} — 수정
    @PutMapping("/{id}")
    public ResponseEntity<TransactionResponseDto> update(@PathVariable Long id,
                                                          @RequestBody TransactionRequestDto dto) {
        return ResponseEntity.ok(transactionService.update(id, dto));
    }

    // DELETE /api/transactions/{id} — 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transactionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
