package com.morozov.app.rest_fetch_ajax.controller;




import com.morozov.app.rest_fetch_ajax.model.Role;
import com.morozov.app.rest_fetch_ajax.model.User;
import com.morozov.app.rest_fetch_ajax.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
@RequestMapping("/admin/")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @GetMapping("userList")
    public String showAllUsers(Model model, Principal principal) {
        model.addAttribute("users", userService.getAllUsers());
        User user = userService.getUserByName(principal.getName());
        model.addAttribute("userInfo", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("roles", userService.getAllRoles());
        return "all-users";
    }



}