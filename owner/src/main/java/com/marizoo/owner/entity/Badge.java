package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
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
