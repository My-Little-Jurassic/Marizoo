package com.marizoo.owner.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalListResponse<T> {

    private T animals;

}
