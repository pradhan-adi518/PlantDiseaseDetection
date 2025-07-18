package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.ChatModel;
import com.KrishiMitra.KrishiMitra.util.Messege;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

import java.util.List;

public interface ChatsRepo extends MongoRepository<ChatModel,String> {

    @Query("{'isActive':true}")
    ChatModel[] getInactive();

    @Query("{'isActive':true, 'chatWith' : ?0}")
    List<ChatModel> getChats(String pin);

    @Query("{'isActive':true, 'username' : ?0}")
    List<ChatModel> getModel(String username);


    @Query("{ '_id': ?0 }")
    @Update("{ '$push': { 'messages': ?1 } }")
    void addMessage(String id, Messege messege);
}
