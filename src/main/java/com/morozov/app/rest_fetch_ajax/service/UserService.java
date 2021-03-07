package com.morozov.app.rest_fetch_ajax.service;




import com.morozov.app.rest_fetch_ajax.model.Role;
import com.morozov.app.rest_fetch_ajax.model.User;

import java.util.List;

public interface UserService {

    User getUserByName(String username);

    List<User> getAllUsers();

    void saveUser(User user);

    User getUser(long id);

    void deleteUser(long id);

    List<Role> getAllRoles();

    Role getRoleById(long id);
}
