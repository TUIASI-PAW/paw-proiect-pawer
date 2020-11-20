package com.pf.services.interfaces;

import com.pf.entities.models.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;


public interface ProjectService {
    Page<Project> GetMyProjects(long userId,Pageable paging);

    Page<Project> GetAllAvailableProjects(boolean isAvailable, Pageable paging);

    Page<Project> findByTechnology(@Param("technology")String technology, Pageable pageable);

    Project GetById(Long id) throws Exception;

    Project Save(Project project);

    void Update(Project project, long id) throws Exception;

    void Delete(long id);
}
