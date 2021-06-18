package ro.ubb.cms.server.service.mapper

import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.AssignmentDto
import ro.ubb.cms.server.entity.Assignment
import ro.ubb.cms.server.entity.key.AssignmentKey

@Component
class AssignmentMapper: EntityMapper<Assignment, AssignmentDto> {
    override fun toEntity(dto: AssignmentDto): Assignment {
        return Assignment(
            AssignmentKey(dto.pcMemberId, dto.conferenceId),
            dto.designation
        )
    }

    override fun toDto(entity: Assignment): AssignmentDto {
        return AssignmentDto(
            entity.key.pcMemberId,
            entity.key.conferenceId,
            entity.designation
        )
    }
}
