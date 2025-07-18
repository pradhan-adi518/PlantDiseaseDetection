package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.FertilizerRecommendModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FertlizerRepo extends MongoRepository<FertilizerRecommendModel,String> {
}
