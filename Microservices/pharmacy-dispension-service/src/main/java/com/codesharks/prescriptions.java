package com.codesharks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
@JsonIgnoreProperties
public class prescriptions {
    private String preId;
    private String createdDate;
    private String doctor;
    private int total;
    private String patient;

    public prescriptions() {
    }

    public String getPreId() {
        return preId;
    }

    public void setPreId(String preId) {
        this.preId = preId;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }
}
