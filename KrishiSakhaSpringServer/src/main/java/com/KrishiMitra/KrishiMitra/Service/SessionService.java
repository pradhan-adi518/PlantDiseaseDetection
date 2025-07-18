package com.KrishiMitra.KrishiMitra.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@EnableScheduling
public class SessionService {

    private static final Logger log = LoggerFactory.getLogger(SessionService.class);

    @Scheduled(fixedDelay = 5000)
    @Async
    public void clearChatSession(){

    }
}
