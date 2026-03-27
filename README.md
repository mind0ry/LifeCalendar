# 일정 & 가계부

> 개인적으로 일정과 소비를 한 곳에서 관리하고 싶어서 직접 만든 웹 서비스입니다.

<br>

## 소개

달력 하나에서 **일정 관리**와 **가계부**를 동시에 확인할 수 있는 개인용 웹 애플리케이션입니다.
날짜를 클릭하면 그날의 일정과 수입·지출 내역을 바로 볼 수 있고,
월별 소비 합계와 카테고리별 지출 패턴을 차트로 시각화해 소비 흐름을 파악할 수 있습니다.

<br>

## 기능

| 기능 | 설명 |
|------|------|
| 달력 조회 | 월별 달력에서 날짜별 일정·수입·지출 한눈에 확인 |
| 일정 관리 | 일정 추가 / 수정 / 삭제 (시작·종료 시간, 메모 포함) |
| 가계부 관리 | 수입·지출 추가 / 수정 / 삭제 (카테고리, 금액, 메모) |
| 월별 통계 | 수입·지출·순수익 요약 카드 |
| 추이 차트 | 최근 6개월 수입·지출 비교 바 차트 |
| 카테고리 차트 | 이번 달 카테고리별 지출 비율 도넛 차트 |

<br>

## 기술 스택

### Backend
![Java](https://img.shields.io/badge/Java_17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot_3.2-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL_8-4479A1?style=flat-square&logo=mysql&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

<br>

## 프로젝트 구조

```
myweb/
├── myweb-backend/          # Spring Boot API 서버
│   └── src/main/java/com/myweb/
│       ├── schedule/       # 일정 CRUD
│       ├── transaction/    # 수입·지출 CRUD
│       ├── calendar/       # 달력 통합 조회 API
│       ├── stats/          # 통계 API
│       └── config/         # CORS 설정
│
└── myweb-frontend/         # React 클라이언트
    └── src/
        ├── api/            # Axios API 호출
        ├── components/     # 달력·모달·통계 컴포넌트
        ├── pages/          # CalendarPage
        └── types/          # TypeScript 타입 정의
```

<br>

## API 목록

| 메서드 | 경로 | 설명 |
|--------|------|------|
| `GET` | `/api/calendar?year=&month=` | 달력 통합 조회 (일정 + 수입·지출) |
| `POST` | `/api/schedules` | 일정 생성 |
| `PUT` | `/api/schedules/{id}` | 일정 수정 |
| `DELETE` | `/api/schedules/{id}` | 일정 삭제 |
| `POST` | `/api/transactions` | 수입·지출 생성 |
| `PUT` | `/api/transactions/{id}` | 수입·지출 수정 |
| `DELETE` | `/api/transactions/{id}` | 수입·지출 삭제 |
| `GET` | `/api/stats?year=&month=` | 월별 통계 |
| `GET` | `/api/stats/trend?year=&month=` | 최근 6개월 추이 |

<br>

## 스크린샷

| 달력 메인 | 통계 |
|-----------|------|
| 날짜별 일정·수입·지출 표시 | 월별 추이 + 카테고리 차트 |
