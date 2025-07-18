package com.KrishiMitra.KrishiMitra.Service;

import com.KrishiMitra.KrishiMitra.DTO.CoOrdinates;
import com.KrishiMitra.KrishiMitra.DTO.CoOrdinatesRes;
import com.KrishiMitra.KrishiMitra.DTO.SoilGridsResponseDTO;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.util.ArchiveData;
import com.KrishiMitra.KrishiMitra.util.InputWeatherData;
import com.KrishiMitra.KrishiMitra.util.NPKvalues;
import com.KrishiMitra.KrishiMitra.util.WeatherData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ModelInputService {

    @Autowired
    RestTemplate template;

    public NPKvalues getNPKValues(String pin){
        CoOrdinates coOrdinates=getCoordinates(pin);
        SoilGridsResponseDTO response=null;
        String soilUrl=constructUrl(coOrdinates.getLongitude(),coOrdinates.getLatitude());
        try{
            response=template.getForEntity(soilUrl, SoilGridsResponseDTO.class).getBody();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
        }
        NPKvalues npKvalues=new NPKvalues();

        try{
            SoilGridsResponseDTO.Properties.Layer nitrogenLayer = response.getProperties().getLayers().get(2); // Index for "nitrogen"
            SoilGridsResponseDTO.Properties.Layer phh2oLayer = response.getProperties().getLayers().get(3);    // Index for "phh2o"
            SoilGridsResponseDTO.Properties.Layer cec = response.getProperties().getLayers().get(0); // Index for "nitrogen"
            SoilGridsResponseDTO.Properties.Layer clay = response.getProperties().getLayers().get(1);
            SoilGridsResponseDTO.Properties.Layer soc = response.getProperties().getLayers().get(4); // Index for "nitrogen"

            SoilGridsResponseDTO.Properties.Depth nitrogenDepth = nitrogenLayer.getDepths().get(0); // Depth index for 5-15cm
            double nitrogenMean = nitrogenDepth.getValues().getMean();
            npKvalues.setN(nitrogenMean); // Adjust by d_factor

            SoilGridsResponseDTO.Properties.Depth phh2oDepth = phh2oLayer.getDepths().get(0); // Depth index for 5-15cm
            double phh2oMean = phh2oDepth.getValues().getMean();
            npKvalues.setPh(phh2oMean * 0.8 / phh2oLayer.getUnit_measure().getD_factor());

            double pot = estimatePotassium(clay.getDepths().get(0).getValues().getMean(),
                    cec.getDepths().get(0).getValues().getMean(),
                    nitrogenMean
            );
            npKvalues.setK(pot);
            double phos = estimatePhosphorus(soc.getDepths().get(0).getValues().getMean(),
                    phh2oMean,
                    cec.getDepths().get(0).getValues().getMean()
            );
            npKvalues.setP(phos);
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            npKvalues.setPh(6.50);
            npKvalues.setK(50.0);
            npKvalues.setN(80.0);
            npKvalues.setP(40.0);
        }
        return npKvalues;
    }

    public WeatherData getWeatherDataFront(String pin){
        CoOrdinates coOrdinates=getCoordinates(pin);
        WeatherData res=null;
        InputWeatherData inputWeatherData=new InputWeatherData();
        try {
            return template.getForObject(constructWeatherUrl(coOrdinates.getLatitude(),coOrdinates.getLongitude()), WeatherData.class);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    public InputWeatherData getWeatherData(String pin){
        CoOrdinates coOrdinates=getCoordinates(pin);
        WeatherData res=null;
        InputWeatherData inputWeatherData=new InputWeatherData();
        try {
            res = template.getForObject(constructWeatherUrl(coOrdinates.getLatitude(),coOrdinates.getLongitude()), WeatherData.class);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new InputWeatherData(82.0,202.0,30.4);
        }
        if (res==null){
            return new InputWeatherData(82.0,202.0,30.4);
        }
        inputWeatherData.setTemp(res.getCurrent().getTemperature_2m());
        inputWeatherData.setHumidity(res.getCurrent().getRelative_humidity_2m());
        ArchiveData data=null;
        try{
            data=template.getForObject(constructArchiveUrl(coOrdinates.getLatitude(),coOrdinates.getLongitude()), ArchiveData.class);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new InputWeatherData(82.0,202.0,30.4);
        }
        double sum=0;
        if (data==null){
            return new InputWeatherData(82.0,202.0,30.4);
        }
        for (double i : data.getDaily().getRain_sum()){
            sum+=i;
        }
        inputWeatherData.setRain(sum/3);
        return inputWeatherData;
    }

    private CoOrdinates getCoordinates(String pin){
        List<CoOrdinatesRes> res=null;
        try{
            res = template.exchange(
                    "https://nominatim.openstreetmap.org/search?postalcode=581340&country=India&format=json",
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<CoOrdinatesRes>>() {}
            ).getBody();
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return new CoOrdinates(74.0,14.0);
        }
        System.out.println(res);
        if (res==null || res.isEmpty()){
            return new CoOrdinates(74.0,14.0);
        }
         return new CoOrdinates(Double.parseDouble(res.get(0).getLat()),Double.parseDouble(res.get(0).getLon()));
    }

    String constructUrl(double longitude, double latitude) {
        String baseUrl = "https://rest.isric.org/soilgrids/v2.0/properties/query";

        return UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("lon", longitude)
                .queryParam("lat", latitude)
                .queryParam("property", "cec")
                .queryParam("property", "clay")
                .queryParam("property", "nitrogen")
                .queryParam("property", "phh2o")
                .queryParam("property", "soc")
                .queryParam("depth", "5-15cm")
                .queryParam("value", "mean")
                .toUriString();
    }
    public String constructArchiveUrl(double latitude, double longitude) {
        String baseUrl = "https://archive-api.open-meteo.com/v1/archive";

        return UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("start_date", "2023-01-01")
                .queryParam("end_date", "2023-12-31")
                .queryParam("daily", "rain_sum")
                .queryParam("timezone", "auto")
                .toUriString();
    }

    public String constructWeatherUrl(double latitude, double longitude) {
        String baseUrl = "https://api.open-meteo.com/v1/forecast";

        return UriComponentsBuilder.fromHttpUrl(baseUrl)
                .queryParam("latitude", latitude)
                .queryParam("longitude", longitude)
                .queryParam("current", "temperature_2m,relative_humidity_2m,rain,weather_code,wind_speed_10m,wind_direction_10m")
                .queryParam("models", "icon_seamless")
                .toUriString();
    }
    private double estimatePhosphorus(double soc, double ph, double cec) {
        return (soc * 0.1) + (ph * 0.2) + (cec * 0.15);
    }

    double estimatePotassium(double clay, double cec, double nitrogen) {

        return (clay * 0.25) + (cec * 0.2) + (nitrogen * 0.1);
    }



}
