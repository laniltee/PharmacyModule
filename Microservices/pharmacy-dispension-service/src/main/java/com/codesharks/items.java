package com.codesharks;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
@JsonIgnoreProperties
public class items {
    private String name;
    private int price;
    private int available;

    public items() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getAvailable() {
        return available;
    }

    public void setAvailable(int available) {
        this.available = available;
    }
}
