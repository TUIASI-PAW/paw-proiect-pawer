package com.pf.boundries.dto.read;

import lombok.Data;

import java.util.Date;

@Data
public class ReadDetails {
    private Long id;

    private Long noMembers;

    private String description;

    private Date startDate;

    private Long project_id;
}
