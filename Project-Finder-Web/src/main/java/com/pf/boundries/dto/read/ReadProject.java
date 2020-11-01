package com.pf.boundries.dto.read;

import com.pf.entities.models.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ReadProject {
    private Long id;

    private String name;

    private String technologies;

    private boolean isAvailable;

    private List<Long> users_ids = new ArrayList<>();

    private long owner_id;

    public void setUsers_ids(List<User> team) {
        team.forEach(a -> users_ids.add(a.getId()));
    }

}
