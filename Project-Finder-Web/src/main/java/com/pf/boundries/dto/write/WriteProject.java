package com.pf.boundries.dto.write;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class WriteProject {
    private String name;

    private String technologies;

    private boolean isAvailable;

    private List<Long> users_ids = new ArrayList<>();

    private long owner_id;
}
