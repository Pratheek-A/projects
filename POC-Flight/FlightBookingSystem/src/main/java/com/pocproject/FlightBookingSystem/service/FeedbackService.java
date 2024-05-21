package com.pocproject.FlightBookingSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pocproject.FlightBookingSystem.dto.Feedbackdto;
import com.pocproject.FlightBookingSystem.model.Feedback;
import com.pocproject.FlightBookingSystem.model.User;
import com.pocproject.FlightBookingSystem.repository.FeedbackRepository;

@Service
public class FeedbackService {
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private UserService userService;

	public Feedback addFeedback(Long userId, Feedbackdto feedbackDto) {
		User user = userService.getUserById(userId);
		
		Feedback feedback = new Feedback();
		
		feedback.setUser(user);
		feedback.setFeedback(feedbackDto.getFeedback());
		
		return feedbackRepository.save(feedback);
	}

	public List<Feedback> getFeedbacks() {
		List<Feedback> feedbacks = feedbackRepository.findAll();
		return feedbacks;
	}
	

}
