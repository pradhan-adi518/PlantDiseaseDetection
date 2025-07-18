package com.KrishiMitra.KrishiMitra.Repo;


import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecommendationRepo extends MongoRepository<CropRecommend,String> {

    CropRecommend findByName(String name);
}
