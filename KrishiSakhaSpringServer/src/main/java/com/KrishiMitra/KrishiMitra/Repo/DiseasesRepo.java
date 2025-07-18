package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DiseasesRepo extends MongoRepository<DiseasesModel,String> {
    DiseasesModel findByClassName(String className);
}
