package com.pf.boundries.dto.write;

import java.util.ArrayList;
import java.util.List;

public class WriteProject {
    private String name;

    private String technologies;

    private boolean isAvailable;

    private List<Long> users_ids = new ArrayList<>();

    private long owner_id;
}
