package com.codesharks;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
public interface PrescriptionsRepository extends CrudRepository<prescriptions, String> {
    public prescriptions getByPreId(String preId);
    public void deleteByPreId(String preId);
}
