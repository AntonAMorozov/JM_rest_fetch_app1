package com.morozov.app.rest_fetch_ajax.dao;



import com.morozov.app.rest_fetch_ajax.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role,Long> {

    Role getRoleById(long id);
    List<Role> getRolesById(long id);
}
