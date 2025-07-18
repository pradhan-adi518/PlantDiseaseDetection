package com.KrishiMitra.KrishiMitra.Service;

import com.KrishiMitra.KrishiMitra.Models.DiseasePrediction;
import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import com.KrishiMitra.KrishiMitra.Models.FertilizerSave;
import com.KrishiMitra.KrishiMitra.Models.SaveRecommendation;
import com.KrishiMitra.KrishiMitra.Repo.CropRecommendationSaveRepo;
import com.KrishiMitra.KrishiMitra.Repo.DiseasePredictionRepo;
import com.KrishiMitra.KrishiMitra.Repo.FertilizerSaveRepo;
import com.KrishiMitra.KrishiMitra.util.InputWeatherData;
import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URL;

@Service
public class ModelSavingService {

    @Autowired
    DiseasePredictionRepo diseasePredictionRepo;

    @Autowired
    FertilizerSaveRepo fertilizerSaveRepo;

    @Autowired
    CropRecommendationSaveRepo cropRecommendationSaveRepo;

    @Async
    public void saveDisease(String username, String image, String result){
        diseasePredictionRepo.save(
                new DiseasePrediction(
                        null,
                        username,
                        "",
                        result
                )
        );
    }

    @Async
    public void saveRecommendation(String username, NPKvalues npKvalues, InputWeatherData weatherData,String result){
        cropRecommendationSaveRepo.save(
                new SaveRecommendation(
                        null,
                        username,
                        npKvalues,
                        weatherData,
                        result
                )
        );
    }

    @Async
    public void saveFertilizer(String username, NPKvalues npKvalues,String result){
        fertilizerSaveRepo.save(
                new FertilizerSave(
                        null,
                        username,
                        npKvalues,
                        result
                )
        );
    }
}
