package com.KrishiMitra.KrishiMitra.Repo;


import com.KrishiMitra.KrishiMitra.Models.Officials;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OfficialsRepo extends MongoRepository<Officials,String> {

    Officials findByPin(String pin);
}
