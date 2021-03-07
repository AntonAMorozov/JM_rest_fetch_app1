package com.morozov.app.rest_fetch_ajax.dao;


import com.morozov.app.rest_fetch_ajax.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User getUserByUsername(String name);
    User getUserByEmail(String email);

}
