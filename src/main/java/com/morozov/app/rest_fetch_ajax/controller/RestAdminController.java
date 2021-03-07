package com.morozov.app.rest_fetch_ajax.controller;

import com.morozov.app.rest_fetch_ajax.model.User;
import com.morozov.app.rest_fetch_ajax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/")
public class RestAdminController {


    private final UserService userService;

    @Autowired
    public RestAdminController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping(value = "/users")//Список всех пользователей
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> userList = userService.getAllUsers();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }

    @PostMapping(value = "/newUser")//Создать нового пользователя
    public ResponseEntity<?> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder().encode(user.getPassword()));
        userService.saveUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping(value = "/users/{id}")//Получить пользователя по ID
    public ResponseEntity<User> getUser(@PathVariable(name = "id") long id) {
        User user = userService.getUser(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/users")//Редактирование пользователя
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        if(user.getPassword().length() != 60){
            user.setPassword(passwordEncoder().encode(user.getPassword()));
        }
        userService.saveUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping(value = "/users/{id}")//Удалить пользвателя
    public ResponseEntity<User> deleteUser(@PathVariable(name = "id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);

    }


}