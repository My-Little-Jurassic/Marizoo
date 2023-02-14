package com.marizoo.user.dto;

import com.marizoo.user.entity.BookStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class BookDto {

    private Long id;
    private LocalDateTime playDateTime;

    private Integer totalVisitor;
    private String StoreName;
    private String tel;
    private String img;
    private BookStatus status;
    private String playTitle;

    private Long storeId;
//    private PlayType playType;
}
