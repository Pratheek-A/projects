package com.pocproject.FlightBookingSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pocproject.FlightBookingSystem.dto.Feedbackdto;
import com.pocproject.FlightBookingSystem.model.Feedback;
import com.pocproject.FlightBookingSystem.service.FeedbackService;

@RestController
@CrossOrigin("*")
public class FeedbackController {
	
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/feedback/{userId}")
	public ResponseEntity<String> sendFeedback(@PathVariable Long userId, @RequestBody Feedbackdto feedbackDto) {
		Feedback feedback = feedbackService.addFeedback(userId, feedbackDto);
		
		if(feedback!=null) {
			return ResponseEntity.ok("Thanks for your feedback. We will reply you shortly");
		}else {
			throw new RuntimeException("Cannot add feedback");
		}
		
	}
	
	@GetMapping("/feedbacks")
	public List<Feedback> getAllFeedbacks(){
		return feedbackService.getFeedbacks();
	}
	
//	@GetMapping("/feedbackReply/{userId}")
//	public ResponseEntity<String> replyFeedback(@PathVariable Long userId){
//		feedbackService.sendReply(userId)
//	}

}
