package com.KrishiMitra.KrishiMitra.Service;


import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import com.KrishiMitra.KrishiMitra.Models.FertilizerRecommendModel;
import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Repo.DiseasesRepo;
import com.KrishiMitra.KrishiMitra.Repo.FertlizerRepo;
import com.KrishiMitra.KrishiMitra.Repo.OfficialsRepo;
import com.KrishiMitra.KrishiMitra.Repo.RecommendationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MasterService {

    @Autowired
    OfficialsRepo officialsRepo;

    @Autowired
    DiseasesRepo diseasesRepo;

    @Autowired
    RecommendationRepo recommendationRepo;

    @Autowired
    FertlizerRepo fertlizerRepo;

    public void addOfficial(Officials officials){
        officialsRepo.insert(officials);
    }

    public void addDisease(DiseasesModel model){
        diseasesRepo.insert(model);
    }

    public DiseasesModel getDisease(String className){
       return diseasesRepo.findByClassName(className);
    }

    public void addRecommendation(CropRecommend obj){
        recommendationRepo.insert(obj);
    }

    public void addFertlizer(FertilizerRecommendModel model){
        fertlizerRepo.insert(model);
    }
}
