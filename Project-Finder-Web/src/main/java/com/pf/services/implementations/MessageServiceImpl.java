package com.pf.services.implementations;

import com.pf.entities.models.Message;
import com.pf.entities.repositories.MessageRepository;
import com.pf.services.interfaces.MessageService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;

    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public Message PostMessage(Message message) {
        return this.messageRepository.save(message);
    }

    @Override
    public List<Message> FindConversation(String sender, String receiver) {
        return this.messageRepository.findConversation(sender, receiver, Sort.by(Sort.Direction.ASC, "date"));
    }

    @Override
    public List<Message> FindUnseenMessages(String receiver) {
        return this.messageRepository.findUnseenMessages(receiver, Sort.by(Sort.Direction.DESC, "date"));
    }

    @Override
    public void UpdateById(Long id, Message message) throws Exception {
        Message databaseMessage = this.messageRepository.findById(id).orElse(null);

        if(databaseMessage == null) {
            throw new Exception("No message with id " + id + " found");
        }

        if(message.getSeen() != null) {
            databaseMessage.setSeen(message.getSeen());
        }

        messageRepository.save(databaseMessage);
    }
}
