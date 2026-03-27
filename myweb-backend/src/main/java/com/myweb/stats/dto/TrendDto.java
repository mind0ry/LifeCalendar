package com.myweb.stats.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TrendDto {
    private int year;
    private int month;
    private long income;
    private long expense;
}
