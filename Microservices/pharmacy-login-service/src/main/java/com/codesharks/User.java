package com.codesharks;

import com.fasterxml.jackson.databind.ser.Serializers;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Base64;

/**
 * Created by Lanil Marasinghe on 21-Jun-17.
 */
@Entity
public class User {

    @Id
    private String username;

    private String name;
    private String password;
    private String email;
    private String type;
    private String department;

    @Transient
    private Base64.Encoder encoder;

    @Transient
    private Base64.Decoder decoder;

    public User() {
        encoder = Base64.getEncoder();
        decoder = Base64.getDecoder();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        //return password;
        return new String(decoder.decode(password));
    }

    public void setPassword(String password) {
        //this.password = password;
        this.password = encoder.encodeToString(password.getBytes());
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
