package com.codesharks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
@JsonIgnoreProperties
public class presc_items {
    private String preId;
    private String drug;
    private String dosage;
    private String unitPrice;
    private int totalPrice;
    private int quantity;

    public presc_items() {
    }

    public String getPreId() {
        return preId;
    }

    public void setPreId(String preId) {
        this.preId = preId;
    }

    public String getDrug() {
        return drug;
    }

    public void setDrug(String drug) {
        this.drug = drug;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(String unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
