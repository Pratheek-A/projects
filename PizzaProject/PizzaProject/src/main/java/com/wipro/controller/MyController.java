package com.wipro.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wipro.model.Cart;
import com.wipro.model.Food;
import com.wipro.model.Payment;
import com.wipro.model.Store;
import com.wipro.model.User;
import com.wipro.repository.CartRepository;
import com.wipro.repository.FoodRepository;
import com.wipro.repository.PaymentRepository;
import com.wipro.repository.StoreRepository;
import com.wipro.repository.UserRepository;
import com.wipro.service.CartService;
import com.wipro.service.FoodService;
import com.wipro.service.PaymentService;
import com.wipro.service.StoreService;
import com.wipro.service.UserService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins="http://localhost:3000")
@RestController
public class MyController {
		
	@Autowired
	UserService us;
	
	@Autowired
	UserRepository ur;
	
	@Autowired
	StoreService ss;
	
	@Autowired
	StoreRepository sr;
	
	@Autowired
	FoodRepository fr;
	
	@Autowired
	FoodService fs;
	
	@Autowired
	CartService cs;
	
	@Autowired
	CartRepository cr;
	
	@Autowired
	PaymentService ps;
	
	@Autowired
	PaymentRepository pr;
	
	private int userSession=0;
	
	@RequestMapping("/hi")
	public String hi() {
		return "Hello";
	}
	
	@PostMapping("/reg")
	public int register(@RequestBody User u) {
		us.getRegister(u);
		return u.getId();
	}
	
	@PostMapping("/userLogin")
	public ResponseEntity<String> userLogin(@RequestParam("userId") int userId,@RequestParam("password") String password,HttpSession session) {	
		User u=ur.findById(userId).orElse(null);
		userSession=u.getId();
		System.out.println(u);
		
		if(us.validateLogin(userId,password).equals("success")) {		
			return ResponseEntity.status(200).body("Successfull");			
		}	
		else if(us.validateLogin(userId,password).equals("Invalid")) {
			return ResponseEntity.status(200).body("Failed");
		
		}
		return ResponseEntity.status(200).body("");
	}	
	
	@PostMapping("/adminLogin")
    public String adminLogin(@RequestParam String emailId,@RequestParam String password) { 
        if ("pratheek@gmail.com".equals(emailId) && "pratheek123".equals(password)) {
            return "Successfull";
        } else {
            return "Failed";
        }
    }
	
	@PostMapping("/addStore")
	public ResponseEntity<String> addStore(@RequestBody Store s) {
		ss.addingStoreDetails(s);
		return ResponseEntity.status(200).body("Successfull");
    }
	
	@GetMapping("/viewStore")
	public List<Store> viewStore() {
		return ss.getAllStores();
	}
	
	@PostMapping("/modifyStore")
	public ResponseEntity<String> modifyStore(@RequestParam("storeId") int storeId,@RequestBody Store s) {
		Store st=sr.findById(storeId).orElse(null);
		if(st==null) {
			return ResponseEntity.status(200).body("Failed");
		}else {		
		st.setStoreName(s.getStoreName());
		st.setStorePlace(s.getStorePlace());
		st.setStoreLocality(s.getStoreLocality());
		st.setStoreState(s.getStoreState());
		st.setStoreNumber(s.getStoreNumber());
		sr.save(st);
		return ResponseEntity.status(200).body("Successfull");
		}		
    }
	
	@PostMapping("/deleteStore/{storeId}")
	public ResponseEntity<String> deleteStore(@PathVariable int storeId){		
		Store st=sr.findById(storeId).orElse(null);
		if(st==null) {
			return ResponseEntity.status(200).body("Failed");
		}	
		else {			
			sr.deleteById(storeId);
			return ResponseEntity.status(200).body("Successfull");
		}
	}
	
	@PostMapping("/search")
	public List<Store> searchStore(@RequestParam("storePlace") String storePlace,@RequestParam("storeState") String storeState) {	
		List<Store>store=ss.getStores(storePlace,storeState);
		if(store.size()==0) {		
			return null;		
		}	
		return store;
	}	
	
	@PostMapping("/addFood")
	public ResponseEntity<String> addFood(@RequestBody Food f,@RequestParam("storeId") int storeId) {	
		Store s=sr.findById(storeId).orElse(null);	
		if(s==null) {
			return ResponseEntity.status(200).body("Failed");
		}
		f.setStore(s);
		f.setStoreName(s.getStoreName());	
		fs.addingFoodDetails(f);
		return ResponseEntity.status(200).body("Successfull");
    }
	
	@PostMapping("/modifyFood")
	public ResponseEntity<String> modifyFood(@RequestParam("foodId") int foodId,@RequestBody Food f) {	
		System.out.println(foodId);
		Food s=fr.findById(foodId).orElse(null);	
		if(s==null) {
			return ResponseEntity.status(200).body("Failed");
		}
		else {
			s.setFoodName(f.getFoodName());
			s.setFoodPrice(f.getFoodPrice());		
		fr.save(s);
		return ResponseEntity.status(200).body("Successfull");
		}		
    }
	
	@GetMapping("/getStoreDetails/{storeId}")
	public Store storeDetails(@PathVariable int storeId) {
		return ss.getStore(storeId);
	}
	
	@GetMapping("/getFoodDetails/{foodId}")
	public Food foodDetails(@PathVariable int foodId) {
		return fs.getFood(foodId);
	}
	
	@GetMapping("/getQuantity/{cartId}")
	public Cart getQuantity(@PathVariable int cartId) {
		return cs.getQuan(cartId);
	}
	
	@GetMapping("/viewFood")
	public List<Food> viewFood() {
		return fs.getAllFoods();
	}
		
	@PostMapping("/deleteFood/{foodId}")
	public ResponseEntity<String> deleteFood(@PathVariable int foodId){
		if(fr.existsById(foodId)) {		
			fr.deleteById(foodId);
			return ResponseEntity.status(200).body("Successfull");
		}
		return ResponseEntity.status(200).body("Failed");
	}
	
	@RequestMapping("/viewAvailableFoods")
	public ResponseEntity<List<Food>> viewFoods(@RequestParam("storeId") int storeId) {
	    try {
	        List<Food> food = fs.getAvailableFoods(storeId);        
	        return ResponseEntity.ok(food);
	    } catch (Exception e) {        
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	@RequestMapping("/addToCart/{foodId}")
    public ResponseEntity<String> addToCart(@PathVariable("foodId") int foodId,@RequestParam int quantity,HttpSession session) {	
		Food s=fr.findById(foodId).orElse(null);
		Cart c=new Cart();
		int uid=userSession;
		if(s==null) {
			return ResponseEntity.status(200).body("Failed");
		}
		else {
			c.setFoodId(foodId);
			c.setFoodName(s.getFoodName());
			c.setQuantity(quantity);
			c.setCostPerPizza(s.getFoodPrice());
			c.setTotalCost(quantity*s.getFoodPrice());
			c.setUserId(uid);		
		cs.addingToCart(c);
		return ResponseEntity.status(200).body("Successfull");
		}		
    }
	
	@RequestMapping("/allCartItems")
	public ResponseEntity<List<Cart>> viewCart() {
	    try {
	    	int uid=userSession;
	        List<Cart> cart = cs.getYourFoods(uid);
	        
	        return ResponseEntity.ok(cart);
	    } catch (Exception e) {
	        
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
	}
	
	@PostMapping("/modifyCart")
	public ResponseEntity<String> modifyCart(@RequestParam ("cartId") int cartId,@RequestParam("quantity") int quantity ,Cart c) {	
		Cart s=cr.findById(cartId).orElse(null);	
		if(s==null) {
			return ResponseEntity.status(200).body("Failed");
		}
		else {
			s.setQuantity(c.getQuantity());
			s.setTotalCost(c.getQuantity()*s.getCostPerPizza());		
		cr.save(s);
		return ResponseEntity.status(200).body("Successfull");
		}		
    }
	
	@PostMapping("/deleteCart/{cartId}")
	public ResponseEntity<String> deleteCart(@PathVariable int cartId){	
		System.out.println(cartId);
		if(cr.existsById(cartId)) {		
			cr.deleteById(cartId);
			return ResponseEntity.status(200).body("Successfull");
		}
		return ResponseEntity.status(200).body("Failed");
	}
	
   @PostMapping("/payment")
   public double payment(@RequestBody Payment p,@RequestParam double  totalCharges ){
	   Payment pay=new Payment();
	   p.setTotalCharges(totalCharges);
	   p.setRemainingBalance(p.getBalance()-p.getTotalCharges());   
	   ps.savingPaymentDetails(p);
	   return p.getRemainingBalance();
   }		
}
