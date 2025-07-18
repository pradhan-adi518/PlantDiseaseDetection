package com.KrishiMitra.KrishiMitra.Controller;


import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import com.KrishiMitra.KrishiMitra.Models.FertilizerRecommendModel;
import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Repo.DiseasesRepo;
import com.KrishiMitra.KrishiMitra.Service.MasterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@Validated
public class MasterController {

    @Autowired
    MasterService masterService;


    @PostMapping("/local/addOfficial")
    public ResponseEntity<?> addOfficial(@Valid @RequestBody Officials req){
        masterService.addOfficial(req);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/local/addDisease")
    public ResponseEntity<?> addDisease(@RequestBody @Valid List<DiseasesModel> data){
        for (DiseasesModel i : data){
            masterService.addDisease(i);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/local/addRecommendation")
    public ResponseEntity<?> addRecommendation(@RequestBody @Valid List<CropRecommend> data){
        for (CropRecommend i : data){
            masterService.addRecommendation(i);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/local/addFertilizer")
    public ResponseEntity<?> addFertilizer(@RequestBody @Valid List<FertilizerRecommendModel> data){
        for (FertilizerRecommendModel i : data){
            masterService.addFertlizer(i);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/local/getDisease")
    public ResponseEntity<?> getDisease(@RequestBody Map<String,String> body){
        return new ResponseEntity<>(masterService.getDisease(body.get("name")),HttpStatus.OK);
    }

}
