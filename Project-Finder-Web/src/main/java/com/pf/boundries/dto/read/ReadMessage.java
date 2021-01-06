package com.pf.boundries.dto.read;

import lombok.Data;

import java.util.Date;

@Data
public class ReadMessage {
    private Long id;

    private String text;

    private Boolean seen;

    private Date date;

    private String sender;

    private String receiver;
}
