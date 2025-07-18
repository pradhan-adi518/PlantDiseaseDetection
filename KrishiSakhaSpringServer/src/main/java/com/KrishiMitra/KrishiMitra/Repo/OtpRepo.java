package com.KrishiMitra.KrishiMitra.Repo;

import com.KrishiMitra.KrishiMitra.Models.OtpValidation;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OtpRepo extends MongoRepository<OtpValidation,String> {

}
