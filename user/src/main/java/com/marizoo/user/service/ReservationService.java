package com.marizoo.user.service;

import com.marizoo.user.api.animalstore_api.ReservationResponse;
import com.marizoo.user.dto.UsersPlay_dto.UsersPlayDto;
import com.marizoo.user.entity.UsersPlay;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import com.marizoo.user.repository.reservation_repo.UsersPlayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReservationService {

    private final AnimalStoreRepository animalStoreRepository;
    private final UsersPlayRepository usersPlayRepository;

    public ReservationResponse getReservatonResult(Long bookId){
        UsersPlayDto usersPlayDto = animalStoreRepository.findStoreNameForReservation(bookId);

        UsersPlay usersPlay = usersPlayRepository.findUsersPlayById(bookId);

        ReservationResponse ReservationResult =
                new ReservationResponse(usersPlay.getId(),
                        usersPlayDto.getStoreName(),
                        usersPlayDto.getPlayDateTime(),
                        usersPlay.getTotalVisitor());
        return ReservationResult;
    }


}
