package com.pf.configurations;

import com.pf.boundries.dto.read.ReadDetails;
import com.pf.boundries.dto.read.ReadProject;
import com.pf.boundries.dto.write.WriteDetails;
import com.pf.boundries.dto.write.WriteProject;
import com.pf.entities.models.Details;
import com.pf.entities.models.Project;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper ModelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.getConfiguration()
                .setSkipNullEnabled(true)
                .setMatchingStrategy(MatchingStrategies.STRICT);

        modelMapper.typeMap(WriteDetails.class, Details.class).addMappings(m -> {
            m.<Long>map(WriteDetails::getProject_id, (Details, id) -> Details.getProject().setId(id));
        });

        modelMapper.typeMap(Details.class, ReadDetails.class).addMappings(m -> {
            m.map(details -> details.getProject().getId(), ReadDetails::setProject_id);
        });

        modelMapper.typeMap(WriteProject.class, Project.class).addMappings(m -> {
            m.<Long>map(WriteProject::getOwner_id, (Project, id) -> Project.getOwner().setId(id));
            m.map(WriteProject::getUsers_ids,Project::setTeam);
        });

        modelMapper.typeMap(Project.class, ReadProject.class).addMappings(m -> {
            m.map(project -> project.getOwner().getId(), ReadProject::setOwner_id);
            m.map(Project::getTeam, ReadProject::setUsers_ids);
        });

        return modelMapper;
    }

}
