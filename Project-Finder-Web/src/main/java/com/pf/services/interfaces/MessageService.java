package com.pf.services.interfaces;

import com.pf.entities.models.Message;
import org.hibernate.sql.Update;

import java.util.List;

public interface MessageService {
    Message PostMessage(Message message);
    List<Message> FindConversation(String sender, String receiver);
    List<Message> FindUnseenMessages(String receiver);
    void UpdateById(Long id, Message message) throws Exception;
}
