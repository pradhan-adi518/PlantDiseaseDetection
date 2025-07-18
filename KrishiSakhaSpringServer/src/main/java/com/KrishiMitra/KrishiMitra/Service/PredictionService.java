package com.KrishiMitra.KrishiMitra.Service;

import com.KrishiMitra.KrishiMitra.DTO.*;
import com.KrishiMitra.KrishiMitra.Models.CropRecommend;
import com.KrishiMitra.KrishiMitra.Models.DiseasesModel;
import com.KrishiMitra.KrishiMitra.Models.FertilizerRecommendModel;
import com.KrishiMitra.KrishiMitra.Repo.DiseasesRepo;
import com.KrishiMitra.KrishiMitra.Repo.FertlizerRepo;
import com.KrishiMitra.KrishiMitra.Repo.RecommendationRepo;
import com.KrishiMitra.KrishiMitra.util.InputWeatherData;
import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

//import java.net.http.HttpHeaders;

@Service
public class PredictionService {
    RestTemplate template=new RestTemplate();

    @Autowired
    DiseasesRepo diseasesRepo;

    @Autowired
    RecommendationRepo recommendationRepo;

    @Autowired
    FertlizerRepo fertlizerRepo;

    public PredictionRes predict(MultipartFile file , String type) throws IOException {
        String url = "http://127.0.0.1:8000/predict";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);


        ByteArrayResource fileAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // Create multipart request body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", fileAsResource);       // image field
        body.add("c_type", type);    // optional description field

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<PredictionRes> response;
        // Send request
       try{
           response = template.postForEntity(url, requestEntity, PredictionRes.class);
       }
       catch (Exception e){
           System.out.println(e.getMessage());
           return null;
       }
        // Return the response from FastAPI

        return response.getBody();
    }

    public DiseasesModel getDisease(String className){
        System.out.println("'"+className+"'");
        return diseasesRepo.findByClassName(className);
    }

    public CropRecResponse getCropRecommendation(NPKvalues npKvalues, InputWeatherData weatherData){
        String url = "http://127.0.0.1:8000/predict/crop";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        CropRecReq req=new CropRecReq(
                npKvalues.getN(),npKvalues.getP(),npKvalues.getK(),
                weatherData.getTemp(),weatherData.getHumidity(),
                npKvalues.getPh(),weatherData.getRain()
        );


        HttpEntity<CropRecReq> requestEntity = new HttpEntity<>(req, headers);
        ResponseEntity<CropRecResponse> response;
        try{
            response = template.postForEntity(url,requestEntity,CropRecResponse.class);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
        return response.getBody();
    }

    public CropRecommend getCropRecommend(String name){
        return recommendationRepo.findByName(name);
    }

    public FertilizerRecommendModel getfertilizerRecommendModel(String name){
        return fertlizerRepo.findById(name).orElse(null);
    }

    public FertilizerRes getFertilizer(NPKvalues npKvalues){
        String url = "http://127.0.0.1:8000/predict/fertilizer";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        FertilizerRecReq req=new FertilizerRecReq(
                npKvalues.getN(),npKvalues.getP(),npKvalues.getK()
        );


        HttpEntity<FertilizerRecReq> requestEntity = new HttpEntity<>(req, headers);
        ResponseEntity<FertilizerRes> response;
        try{
            response = template.postForEntity(url,requestEntity,FertilizerRes.class);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
        return response.getBody();
    }

    public PestRecommend predictPest(MultipartFile file) throws IOException {
        String url = "http://127.0.0.1:8000/pest";

        // Prepare headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        ByteArrayResource fileAsResource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        // Create multipart request body
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", fileAsResource);  // Send image as file

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<PestRecommend> response;

        try {
            // Send POST request to FastAPI
            response = template.postForEntity(url, requestEntity, PestRecommend.class);
        } catch (Exception e) {
            System.out.println("Error while calling FastAPI: " + e.getMessage());
            return null;
        }

        // Return the response from FastAPI
        return response.getBody();
    }

}
