package com.pf.entities.repositories;

import com.pf.entities.models.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface DetailsRepository extends JpaRepository<Details, Long> {
    @Query("SELECT d FROM Details d where d.project.id = :idProject ")
    Details getDetailsByProjectId(@Param("idProject") long idProject);

}
