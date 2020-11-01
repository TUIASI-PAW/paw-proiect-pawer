package com.pf.boundries.dto.read;

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
}
