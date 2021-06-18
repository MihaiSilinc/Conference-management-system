package ro.ubb.cms.server.service.mapper

import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.server.entity.Conference

@Component
class ConferenceMapper: EntityMapper<Conference, ConferenceDto> {
    override fun toEntity(dto: ConferenceDto): Conference {
        return Conference(
            dto.name,
            dto.abstractDeadline,
            dto.callForPapers,
            dto.startingDate,
            dto.endingDate
        )
    }

    override fun toDto(entity: Conference): ConferenceDto {
        return ConferenceDto(
            entity.id.toString(),
            entity.name,
            entity.abstractDeadline,
            entity.callForPapers,
            entity.startingDate,
            entity.endingDate
        )
    }
}
