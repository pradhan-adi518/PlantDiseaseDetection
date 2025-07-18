package com.KrishiMitra.KrishiMitra.Controller;


import com.KrishiMitra.KrishiMitra.DTO.CloseChatReq;
import com.KrishiMitra.KrishiMitra.DTO.CropRecResponse;
import com.KrishiMitra.KrishiMitra.DTO.SessionChatRes;
import com.KrishiMitra.KrishiMitra.DTO.TypesDTO;
import com.KrishiMitra.KrishiMitra.JWT.JwtUtils;
import com.KrishiMitra.KrishiMitra.Models.ChatModel;
import com.KrishiMitra.KrishiMitra.Models.Officials;
import com.KrishiMitra.KrishiMitra.Models.User;
import com.KrishiMitra.KrishiMitra.Repo.TypesRepo;
import com.KrishiMitra.KrishiMitra.Service.ChatService;
import com.KrishiMitra.KrishiMitra.Service.ModelInputService;
import com.KrishiMitra.KrishiMitra.Service.PredictionService;
import com.KrishiMitra.KrishiMitra.Service.UserService;
import com.KrishiMitra.KrishiMitra.util.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.ArrayList;
import java.util.List;

@RestController
@Validated

public class DataController {

    @Autowired
    TypesRepo typesRepo;

    @Autowired
    ChatService chatService;

    @Autowired
    UserService userService;

    @Autowired
    ModelInputService modelInputService;

    @Autowired
    PredictionService predictionService;

    @Autowired
    JwtUtils utils;

    @PostMapping("/getUser")
    public ResponseEntity<?> getUserProfile(){
        User user=(User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/getTypes")
    public ResponseEntity<?> getTypes(){
        return new ResponseEntity<>(new TypesDTO(typesRepo.findAll().get(0).getTypes()),HttpStatus.OK);
    }

    @GetMapping("/getChatSession")
    public ResponseEntity<?> getOfficial(){
        SessionChatRes res=new SessionChatRes();
        User user =(User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Officials official=chatService.getOfficial(user.getAddress().getPin());
        res.setAvailable(official!=null);
        res.setOfficial(official);
        if (official!=null)  {
            res.setChatID(chatService.getChatID(user.getUsername(),official.getPin()));
            res.setChatList(chatService.getChatList(res.getChatID()));
        }
        else  res.setChatID(null);
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @PostMapping("/local/addmsg")
    public ResponseEntity<?> addMessage(@Valid @RequestBody MessageAdd msg){
        if (chatService.addChat(msg.getId(),msg.getMessege())){
            chatService.markActive(msg.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/closeChat")
    public ResponseEntity<?> closeChat(@RequestBody CloseChatReq req){
        User user =(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (chatService.closeChat(req.getChatId(),user.getUsername())){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @GetMapping("/weatherSoilData")
    public ResponseEntity<?> getWeatherSoilData(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(user);
        NPKvalues npKvalues = modelInputService.getNPKValues(user.getAddress().getPin());
        WeatherData weatherData = modelInputService.getWeatherDataFront(user.getAddress().getPin());
        return new ResponseEntity<>(new WeatherRes(weatherData,npKvalues),HttpStatus.OK);
    }

    @GetMapping("/services/getChatList")
    public ResponseEntity<?> getCHatList(@RequestHeader("Authentication") String jwt){
        String cur=utils.getServiceProvider(jwt);
        List<ChatModel> chatModels = chatService.getChatModel(cur);
        return new ResponseEntity<>(chatModels,HttpStatus.OK);
    }
}
