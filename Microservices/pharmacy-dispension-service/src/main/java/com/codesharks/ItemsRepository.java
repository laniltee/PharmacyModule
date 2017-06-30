package com.codesharks;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
public interface ItemsRepository extends CrudRepository<presc_items, String> {
    public List<presc_items> getByPreId(String preId);
    public presc_items getByDrug(String drug);
}
