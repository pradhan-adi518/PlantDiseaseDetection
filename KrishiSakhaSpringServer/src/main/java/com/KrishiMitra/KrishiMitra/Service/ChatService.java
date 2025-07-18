package com.KrishiMitra.KrishiMitra.Service;

import com.KrishiMitra.KrishiMitra.Models.ChatModel;
import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Repo.ChatsRepo;
import com.KrishiMitra.KrishiMitra.Repo.OfficialsRepo;
import com.KrishiMitra.KrishiMitra.util.MessageAdd;
import com.KrishiMitra.KrishiMitra.util.Messege;
import io.jsonwebtoken.security.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Service
public class ChatService {

    @Autowired
    OfficialsRepo officialsRepo;

    @Autowired
    ChatsRepo chatsRepo;

    public Officials getOfficial(String pin){
        return officialsRepo.findByPin(pin);
    }

    public List<ChatModel> getChatModel(String pin){
        return chatsRepo.getChats(pin);
    }

    public List<Messege> getChatList(String chatId){
        ChatModel model = chatsRepo.findById(chatId).orElse(null);
        if (model == null) return null;
        return model.getMessages();
    }

    public boolean closeChat(String chatId,String username){
       ChatModel model =  chatsRepo.findById(chatId).orElse(null);
       if (model ==  null || !Objects.equals(model.getUsername(), username)){
           return false;
       }
       model.setActive(false);
       chatsRepo.save(model);
       return true;
    }

    public String getChatID(String username,String chatWith){
        List<ChatModel> old = chatsRepo.getModel(username);
        System.out.println(old);
        if (!old.isEmpty()){
            return old.get(0).getId();
        }
        ChatModel model=new ChatModel(
                null,
                username,
                chatWith,
                Instant.now(),
                Instant.now(),
                true,
                new ArrayList<Messege>()
        );
        return chatsRepo.insert(model).getId();
    }

    public boolean addChat(String id,Messege msg){
        ChatModel current=chatsRepo.findById(id).orElse(null);
        if (current==null || !current.isActive()) return false;
        msg.setIndex(current.getMessages().size());
        current.getMessages().add(msg);
        chatsRepo.save(current);
        return true;
    }

    public void markActive(String id){
        ChatModel current=chatsRepo.findById(id).orElse(null);
        if (current==null) return;
        current.setActive(true);
        current.setLastActive(Instant.now());
    }



}
