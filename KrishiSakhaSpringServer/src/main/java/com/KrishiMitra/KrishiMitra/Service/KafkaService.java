package com.KrishiMitra.KrishiMitra.Service;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;


@Service
public class KafkaService {

    @Autowired
    KafkaTemplate<String, String> template;


    public void emit(String topic,String msg){
        try {
//            template.send(topic,msg);
        }
        catch (Exception e){
            System.out.println(e.toString());
        }
    }
}
