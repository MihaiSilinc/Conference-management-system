package ro.ubb.cms.server.service.mapper

import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.EvaluationDto
import ro.ubb.cms.server.entity.Evaluation
import ro.ubb.cms.server.entity.key.EvaluationKey

@Component
class EvaluationMapper : EntityMapper<Evaluation, EvaluationDto> {
    override fun toEntity(dto: EvaluationDto): Evaluation {
        return Evaluation(
            EvaluationKey(dto.pcMemberId, dto.proposalId),
            dto.evaluationScore,
            dto.recommendation
        )
    }

    override fun toDto(entity: Evaluation): EvaluationDto {
        return EvaluationDto(
            entity.key.pcMemberId,
            entity.key.proposalId,
            entity.evaluationScore,
            entity.recommendation
        )
    }

}
