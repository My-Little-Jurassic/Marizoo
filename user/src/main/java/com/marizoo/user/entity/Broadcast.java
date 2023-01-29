package com.marizoo.user.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="broadcast")
@Getter
public class Broadcast {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broadcast_id")
    private Long id;

    private String title;                   // 방송 제목
    private String broadcast_type;          // 방송 유형
    private String description;             // 방송 설명
    private String thumbnail;               // 방송 썸네일
    private LocalDateTime startTime;        // 방송 시작 시간
    private LocalDateTime endTime;          // 방송 종료 시간

    @Enumerated(EnumType.STRING)
    private BroadcastStatus status;         // 방송 상태

    @ManyToOne
    @JoinColumn(name = "animal_store_id")
    private AnimalStore animalStore;           // 방송 주체
}
