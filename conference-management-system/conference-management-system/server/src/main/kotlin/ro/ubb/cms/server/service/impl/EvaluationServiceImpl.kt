package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.EvaluationDto
import ro.ubb.cms.api.dto.EvaluationWithInfoDto
import ro.ubb.cms.api.dto.ProposalDto
import ro.ubb.cms.server.entity.key.EvaluationKey
import ro.ubb.cms.server.repository.EvaluationRepository
import ro.ubb.cms.server.service.EvaluationService
import ro.ubb.cms.server.service.mapper.EvaluationMapper
import java.util.*

@Service
class EvaluationServiceImpl(
    @Autowired
    var repository: EvaluationRepository,

    @Autowired
    var mapper: EvaluationMapper
) : EvaluationService {
    override fun createEvaluation(evaluationDto: EvaluationDto): EvaluationDto? {
        val evaluation = mapper.toEntity(evaluationDto)
        val key = EvaluationKey(evaluation.key.pcMemberId, evaluation.key.proposalId);
        if (repository.existsById(key))
            repository.deleteById(key)
        return try {
            mapper.toDto(repository.save(evaluation))
        } catch (exception: DataIntegrityViolationException) {
            null
        }
    }

    override fun getEvaluationsForAuthor(authorId: UUID): List<EvaluationWithInfoDto> {
        return repository.getAllByProposalAuthorId(authorId)
            .map { EvaluationWithInfoDto(
                it.proposal!!.name,
                it.pcMember!!.username,
                it.evaluationScore,
                it.recommendation
            ) }
    }

    override fun getProposalsForReviewer(reviewerId: UUID): List<ProposalDto> {
        return repository.getAllByKey_PcMemberIdAndAndEvaluationScoreNull(reviewerId)
            .map { ProposalDto(
                it.proposal!!.id.toString(),
                it.proposal.name,
                it.proposal.abstractParagraph,
                it.proposal.paper.name,
                it.proposal.author.firstName + " " + it.proposal.author.lastName,
                it.proposal.conference.id.toString()
            ) }
    }

    override fun updateEvaluation(evaluationDto: EvaluationDto): EvaluationDto? {
        val evaluation = mapper.toEntity(evaluationDto)

        if (repository.existsById(evaluation.key))
            return mapper.toDto(repository.save(evaluation))
        return null
    }
}
