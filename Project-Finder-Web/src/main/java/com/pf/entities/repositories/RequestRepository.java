package com.pf.entities.repositories;


import com.pf.entities.models.Details;
import com.pf.entities.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    @Query("SELECT d FROM Request d where d.project.id = :idProject ")
    List<Request> getRequestByProjectId(@Param("idProject") long idProject);
}
