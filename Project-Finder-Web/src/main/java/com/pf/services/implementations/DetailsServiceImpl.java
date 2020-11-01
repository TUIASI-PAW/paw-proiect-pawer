package com.pf.services.implementations;

import com.pf.entities.models.Details;
import com.pf.entities.repositories.DetailsRepository;
import com.pf.services.interfaces.DetailsService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DetailsServiceImpl implements DetailsService {
    private final DetailsRepository detailsRepository;

    public DetailsServiceImpl(DetailsRepository detailsRepository) {
        this.detailsRepository = detailsRepository;
    }

    @Override
    public Details GetDetailsByProjectId(long idProject) {
        return detailsRepository.getDetailsByProjectId(idProject);
    }

    @Override
    public void Update(Details details, long id) throws Exception {
        Optional<Details> databaseDetail = detailsRepository.findById(id);

        if (databaseDetail.isPresent()) {
            detailsRepository.save(details);
        } else {
            throw new Exception("Detail to UPDATE Not Found");
        }
    }

    @Override
    public void Save(Details details) {
        detailsRepository.save(details);
    }
}
