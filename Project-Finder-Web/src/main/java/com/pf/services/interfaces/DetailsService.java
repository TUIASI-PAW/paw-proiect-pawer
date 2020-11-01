package com.pf.services.interfaces;

import com.pf.entities.models.Details;

public interface DetailsService {
    Details GetDetailsByProjectId(long projectId);

    void Update(Details details, long id) throws Exception;

    void Save(Details details);
}
