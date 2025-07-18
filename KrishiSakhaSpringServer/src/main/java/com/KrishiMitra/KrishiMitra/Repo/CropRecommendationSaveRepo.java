package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.SaveRecommendation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CropRecommendationSaveRepo extends MongoRepository<SaveRecommendation,String> {
    List<SaveRecommendation> findByUsername(String username);
}
