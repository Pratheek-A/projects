package com.bookStore.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookStore.entity.MyBookList;
import com.bookStore.repository.MyBookListRepository;

@Service
public class MyBookListService {
	@Autowired
	private MyBookListRepository myBookRepo;
	
	public void saveMyBooks(MyBookList book) {
		myBookRepo.save(book);
	}
	
	public List<MyBookList> getAllMyBooks(){
		return myBookRepo.findAll();
	}
	
	public void deleteById(int id) {
		myBookRepo.deleteById(id);
	}

}
