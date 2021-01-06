package com.pf.entities.repositories;

import com.pf.entities.models.Message;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.sender = :sender and m.receiver = :receiver or m.sender = :receiver and m.receiver = :sender")
    List<Message> findConversation(String sender, String receiver, Sort sort);

    @Query("select m from Message m where m.receiver = :receiver and m.seen = false ")
    List<Message> findUnseenMessages(String receiver, Sort sort);
}
