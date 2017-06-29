package com.codesharks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by Lanil Marasinghe on 21-Jun-17.
 */
@CrossOrigin
@RestController
@RequestMapping(path = "/api")
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/users")
    public @ResponseBody
    boolean addNewUser(@RequestBody User u, HttpServletResponse res) {
        userRepository.save(u);
        res.setStatus(HttpServletResponse.SC_CREATED);
        return true;
    }

    @GetMapping(path = "/users")
    public @ResponseBody
    Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(path = "/authenticate")
    public @ResponseBody
    User authenticateUser(@RequestBody LoginRequest u, HttpServletResponse res) {
        System.out.println(u.getPassword() + " " + u.getUsername());
        if (userRepository.findOne(u.getUsername()) != null && userRepository.findOne(u.getUsername()).getPassword().equals(u.getPassword())) {
            res.setStatus(HttpServletResponse.SC_OK);
            return userRepository.findOne(u.getUsername());
        } else {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

    }
}
