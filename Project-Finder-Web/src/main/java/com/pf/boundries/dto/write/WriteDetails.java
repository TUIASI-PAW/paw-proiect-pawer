package com.pf.boundries.dto.write;

import lombok.Data;

import java.util.Date;

@Data
public class WriteDetails {
    private Long noMembers;

    private String description;

    private Date startDate;

    private Long project_id;
}
