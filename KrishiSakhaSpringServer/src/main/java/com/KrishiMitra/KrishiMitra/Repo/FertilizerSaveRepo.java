package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.FertilizerSave;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FertilizerSaveRepo extends MongoRepository<FertilizerSave,String> {
    List<FertilizerSave> findByUsername(String username);
}
