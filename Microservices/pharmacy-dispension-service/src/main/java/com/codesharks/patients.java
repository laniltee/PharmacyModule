package com.codesharks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
@JsonIgnoreProperties
public class patients {
    private String patientId;
    private String name;
    private int age;
    private String firstDate;

    public patients() {
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getFirstDate() {
        return firstDate;
    }

    public void setFirstDate(String firstDate) {
        this.firstDate = firstDate;
    }
}
