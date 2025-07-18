package com.KrishiMitra.KrishiMitra.Repo;


import com.KrishiMitra.KrishiMitra.Models.DiseasePrediction;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DiseasePredictionRepo  extends MongoRepository<DiseasePrediction,String> {

    List<DiseasePrediction> findByUsername(String username);
}
