package com.pf.entities.models;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long noMembers;

    private String description;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @OneToOne(fetch = FetchType.LAZY)
    private Project project;

}
