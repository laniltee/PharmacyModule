package com.codesharks;

import org.springframework.data.repository.CrudRepository;

/**
 * Created by Lanil Marasinghe on 30-Jun-17.
 */
public interface PatientsRepository extends CrudRepository<patients, String> {
}
