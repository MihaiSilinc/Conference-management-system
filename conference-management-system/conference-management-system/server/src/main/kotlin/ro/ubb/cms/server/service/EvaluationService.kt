package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.EvaluationDto
import ro.ubb.cms.api.dto.EvaluationWithInfoDto
import ro.ubb.cms.api.dto.ProposalDto
import java.util.*

interface EvaluationService {
    fun createEvaluation(evaluationDto: EvaluationDto): EvaluationDto?
    fun getEvaluationsForAuthor(authorId: UUID): List<EvaluationWithInfoDto>
    fun getProposalsForReviewer(reviewerId: UUID): List<ProposalDto>
    fun updateEvaluation(evaluationDto: EvaluationDto): EvaluationDto?
}
