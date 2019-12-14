package com.shadow.demo.controller;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class PushNotificationClient
{
	
	private static final Logger logger = LogManager.getLogger(PushNotificationClient.class);
	
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;
	    
    @RequestMapping("/")
    public String home()
    {
    	//logger.info(":::: trinityWebSocket Server Started :::");
        return "trinityWebSocket Server Started";
    }

	@RequestMapping(value = "/triggerNotification/{userId}", method = RequestMethod.POST)
	private void triggerNotification(@PathVariable("userId") Integer userId, @RequestBody Map<String, Object> content) throws Exception
	{
		logger.info("triggerNotification API reached for ::: " + userId + "with data : "+content);
		messagingTemplate.convertAndSend("/notificationDetails/"+userId,content);
	}

    @MessageMapping("/messages")
	@SendTo("/test/{name}") // is used to send data to brocker
	public String processMessageFromClient(@DestinationVariable String message) throws Exception 
    {
		System.out.println("message " + message);
		return message;
	}

	@MessageMapping("/pingMessage") // is to use it from ui to hit websocket server
	public void ping(String ping) throws Exception
	{
		System.out.println("ping  message " + ping);
		JSONObject json = new JSONObject(ping);
		JSONObject message = json.getJSONObject("message");
		System.out.println("Json Ping " + message.getString("messageTo"));
		messagingTemplate.convertAndSend("/notificationDetails/"+message.getString("messageTo"),message.getString("message"));
	}

	@MessageExceptionHandler
	public String handleException(Throwable exception) 
	{		
		messagingTemplate.convertAndSend("/errors", exception.getMessage());
		return exception.getMessage();
	}
	@MessageMapping("/messages1")
	@SendTo("/kpiViolations/{name}") // is used to send data to brocker
	public String processMessageFromKpi(@DestinationVariable String message) throws Exception {
		System.out.println("KPI message " + message);
		return message;
	}
}

