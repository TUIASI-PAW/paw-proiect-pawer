package com.pf.boundries.dto.read;

import lombok.Data;

@Data
public class ReadRequest {
    private Long id;

    private Long projectId;

    private Long userId;
}
