package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepo extends MongoRepository<User,String> {
    User findByUsername(String username);
}
