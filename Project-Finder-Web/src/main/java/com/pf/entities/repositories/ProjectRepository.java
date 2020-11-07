package com.pf.entities.repositories;

import com.pf.entities.models.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {
    Page<Project> findByIsAvailableOrderById(boolean isAvailable, Pageable pageable);

    Page<Project> findByOwnerIdOrderById(Long ownerId, Pageable pageable);
}
