package com.codesharks;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
public interface StockRepository extends CrudRepository<items, String> {
    public items getByName(String name);
    public void deleteByName(String name);
}
