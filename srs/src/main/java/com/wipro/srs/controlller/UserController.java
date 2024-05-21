package com.wipro.srs.controlller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.wipro.srs.entity.UserLoginCredential;
import com.wipro.srs.entity.UserPasswordChange;
import com.wipro.srs.service.UserCredentialServiceImp;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {
	@Autowired
	UserCredentialServiceImp  credentialServiceImp;
	
	@Autowired
	HttpSession httpSession;
	
	UserLoginCredential credential=new UserLoginCredential();
	
	@GetMapping("/")
	public ModelAndView welcomePage() {
		ModelAndView mv=new ModelAndView();
		mv.setViewName("welcomePage");
		return mv;
	}
	
	@GetMapping("/home")
	public ModelAndView homePage() {
		ModelAndView mv=new ModelAndView();
		mv.setViewName("home");
		return mv;
	}
	@PostMapping("/login")
	public ModelAndView login(UserLoginCredential c) {
		Optional<UserLoginCredential> user=credentialServiceImp.findByUserName(c.getUserName());
		return credentialServiceImp.loginCheck(user, c);
	}
	
	@GetMapping("/registerPage")
	public ModelAndView registerPage() {
		ModelAndView mv=new ModelAndView();
		mv.setViewName("register");
		return mv;
	}
	@PostMapping("/register")
	public ModelAndView insert(UserLoginCredential c) {
		Optional<UserLoginCredential> user=credentialServiceImp.findByUserName(c.getUserName());
		return credentialServiceImp.registerCheck(user, c);
	}
	
	@GetMapping("/changePasswordPage")
	public String changePasswordPage() {
		return "changePassword";
	}
	@PostMapping("/changePassword")
	public ModelAndView changePassword(UserPasswordChange user) {
		Optional<UserLoginCredential> c=credentialServiceImp.findByUserName(user.getUserName());
		return credentialServiceImp.passwordChangeCheck(c, user);
	}
	
	@GetMapping("/logout")
	public String logout(Model model) {
		httpSession.removeAttribute("user");
		model.addAttribute("msg", "Logout successful");
		return "welcomePage";
	}
	

}
