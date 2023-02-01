package com.marizoo.user.api.animalstore_api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BroacastResponse<T> {

    private String title;
    private String thumbnail;
    private T classificationsImgs;
}
