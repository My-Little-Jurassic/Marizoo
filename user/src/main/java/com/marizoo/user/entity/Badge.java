package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Badge extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "badge_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private BadgeType badgeType;

    private String description;

    private int cond;

    private String img;



}
