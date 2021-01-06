package com.pf.boundries.controllers;

import antlr.debug.MessageAdapter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pf.boundries.dto.read.ReadMessage;
import com.pf.boundries.dto.write.WriteMessage;
import com.pf.boundries.dto.write.WriteProject;
import com.pf.entities.models.Message;
import com.pf.services.interfaces.MessageService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class MessageController {
    private final MessageService messageService;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ModelMapper modelMapper;

    public MessageController(MessageService messageService, SimpMessagingTemplate simpMessagingTemplate, ModelMapper modelMapper) {
        this.messageService = messageService;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/api/messages/sender/{sender}/receiver/{receiver}")
    ResponseEntity<?> FindConversation(@PathVariable String sender, @PathVariable String receiver) {
        List<Message> messages = this.messageService.FindConversation(sender, receiver);

        return new ResponseEntity<>(messages.stream().parallel().map(message -> modelMapper.map(message, ReadMessage.class)), HttpStatus.OK);
    }

    @PatchMapping("/api/messages/{id}")
    ResponseEntity<?> UpdatedMessage(@PathVariable Long id, @RequestBody WriteMessage writeMessage) {
       try {
            this.messageService.UpdateById(id, modelMapper.map(writeMessage, Message.class));
           return new ResponseEntity<>(HttpStatus.OK);
       }
       catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.NOT_FOUND);
       }
    }

    @GetMapping("/api/messages/unseen/receiver/{receiver}")
    ResponseEntity<?> FindConversation(@PathVariable String receiver) {
        List<Message> messages = this.messageService.FindUnseenMessages(receiver);

        return new ResponseEntity<>(messages.stream().parallel().map(message -> modelMapper.map(message, ReadMessage.class)), HttpStatus.OK);
    }

    @MessageMapping("/send/message")
    public void sendMessage(String message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            WriteMessage writeMessage = objectMapper.readValue(message, WriteMessage.class);

            ReadMessage readMessage = modelMapper.map(this.messageService.PostMessage(this.modelMapper.map(writeMessage, Message.class)), ReadMessage.class);
            String messageToReturn = objectMapper.writeValueAsString(readMessage);

            this.simpMessagingTemplate.convertAndSend("/message/" + readMessage.getReceiver(), messageToReturn);
            this.simpMessagingTemplate.convertAndSend("/message/" + readMessage.getSender(), messageToReturn);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    @MessageMapping("/update/message")
    public void updateMessage(String message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ReadMessage readMessage = objectMapper.readValue(message, ReadMessage.class);

            this.messageService.UpdateById(readMessage.getId(), modelMapper.map(readMessage, Message.class));
            this.simpMessagingTemplate.convertAndSend("/message/" + readMessage.getSender(), readMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
