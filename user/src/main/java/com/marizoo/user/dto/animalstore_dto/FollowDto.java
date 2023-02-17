package com.marizoo.user.dto.animalstore_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FollowDto {

    private Long store_id;

    private Long user_id;

}
