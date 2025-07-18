package com.KrishiMitra.KrishiMitra.Controller;


import com.KrishiMitra.KrishiMitra.DTO.*;
import com.KrishiMitra.KrishiMitra.Models.CropTypes;
import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.TypesRepo;
import com.KrishiMitra.KrishiMitra.Service.ModelInputService;
import com.KrishiMitra.KrishiMitra.Service.ModelSavingService;
import com.KrishiMitra.KrishiMitra.Service.PredictionService;
import com.KrishiMitra.KrishiMitra.util.InputWeatherData;
import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Objects;

@RestController
@Validated
public class ModelController {

    private static final Logger log = LoggerFactory.getLogger(ModelController.class);
    @Autowired
    PredictionService predictionService;

    @Autowired
    ModelInputService modelInputService;

    @Autowired
    ModelSavingService modelSavingService;

    @Autowired
    TypesRepo typesRepo;

    @Value("spring.croptypes.id")
    String TypeID;

    @PostMapping("/detect")
    public ResponseEntity<?> detect(
             @RequestPart("image") MultipartFile image,
            @Valid @RequestPart("data")DetectReq req
            ){
        User user =(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PredictionRes res=null;
        try {
            res=predictionService.predict(image,req.getCropType());
        } catch (IOException e) {
//            throw new RuntimeException(e);
        }
        System.out.println(res);
        if (res==null || res.getConfidence()<70.0){
            return new ResponseEntity<>(new DetectRes(
                    false,false,0.0,null
            ),HttpStatus.OK);
        }

        DiseasesModel model=predictionService.getDisease(res.getId());
        DetectRes detectReqs =new DetectRes(
            res.getId().toLowerCase().contains("healthy"),
                true,
                res.getConfidence(),
                model
        );
        modelSavingService.saveDisease(user.getUsername(),"",model.getClassName());
        return new ResponseEntity<>(detectReqs,HttpStatus.OK);
    }

    @PostMapping("/predict/crop")
    public ResponseEntity<?> getCorpRecommendation(@Valid @RequestBody PredictionCropReq req){
        NPKvalues npKvalues=new NPKvalues();
        InputWeatherData inputWeatherData=new InputWeatherData();
        User user=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (req.isParams()){
            npKvalues.setP(req.getData().getP());
            npKvalues.setK(req.getData().getK());
            npKvalues.setN(req.getData().getN());
            npKvalues.setPh(req.getData().getPh());
            inputWeatherData.setHumidity(req.getData().getHumidity());
            inputWeatherData.setTemp(req.getData().getTemperature());
            inputWeatherData.setRain(req.getData().getRainfall());
        }
        else {

            npKvalues = modelInputService.getNPKValues(user.getAddress().getPin());
            inputWeatherData = modelInputService.getWeatherData(user.getAddress().getPin());
        }
        CropRecResponse response = predictionService.getCropRecommendation(npKvalues,inputWeatherData);
        if (response==null){
            return new ResponseEntity<>(new PredictionCropRes(false,null),HttpStatus.OK);
        }
        modelSavingService.saveRecommendation(
                user.getUsername(),
                npKvalues,
                inputWeatherData,
                response.getCrop()
        );

        return new ResponseEntity<>(new PredictionCropRes(true,
                predictionService.getCropRecommend(response.getCrop())),HttpStatus.OK);
    }
    @PostMapping("/predict/fertilizer")
    public ResponseEntity<?> getFertilizerRecommendation( @Valid @RequestBody PredictionFerReq req){
        NPKvalues npKvalues = new NPKvalues(req.getN(),req.getP(),req.getK(),0.0);
        FertilizerRes response = predictionService.getFertilizer(npKvalues);
        if (response==null){
            return new ResponseEntity<>(new PredictionFerRes(false,null),HttpStatus.OK);
        }
        User user=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelSavingService.saveFertilizer(
                user.getUsername(),
                npKvalues,
                response.getFertilizer()
        );
        return new ResponseEntity<>(new PredictionFerRes(true,
                predictionService.getfertilizerRecommendModel(response.getFertilizer())),HttpStatus.OK);
    }

    @PostMapping("/predict/pest")
    public ResponseEntity<?> getPestiside(@Valid @RequestPart("image") MultipartFile image){
        User user =(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        PestRecommend res = null;
        try {
            res = predictionService.predictPest(image);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(res,HttpStatus.OK);

    }

    @PostMapping("/local/registerType")
    public ResponseEntity<?> registerTypes(@RequestBody @Valid Map<String,String[]> types){
        CropTypes obj=typesRepo.findAll().get(0);
        System.out.println(obj);
        if (obj!=null){
            obj.setTypes(types.getOrDefault("types",new String[]{}));
            System.out.println(types);
            typesRepo.save(obj);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
