package com.pf.entities.models;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "Projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String technologies;

    private Boolean isAvailable;

    @Nullable
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_projects",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> team = new ArrayList<>();

    @Nullable
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    public void setTeam(List<Long> ids) {
        for (int i = 0; i < ids.size(); i++) {
            team.add(new User(ids.get(i)));
        }

    }
}
