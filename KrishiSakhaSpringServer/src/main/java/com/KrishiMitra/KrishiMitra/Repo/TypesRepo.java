package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.CropTypes;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TypesRepo extends MongoRepository<CropTypes, String> {
}
