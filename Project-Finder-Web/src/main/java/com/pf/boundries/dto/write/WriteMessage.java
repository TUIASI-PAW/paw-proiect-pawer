package com.pf.boundries.dto.write;

import lombok.Data;

import java.util.Date;

@Data
public class WriteMessage {
    private String text;

    private Boolean seen;

    private Date date;

    private String sender;

    private String receiver;
}
