package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ro.ubb.cms.api.dto.EvaluationDto
import ro.ubb.cms.api.dto.EvaluationWithInfoDto
import ro.ubb.cms.api.dto.ProposalDto
import ro.ubb.cms.api.resource.EvaluationResource
import ro.ubb.cms.server.service.EvaluationService
import java.util.*

@RestController
@CrossOrigin(originPatterns = ["*"], allowCredentials = "true")
class EvaluationController(
    @Autowired
    var evaluationService: EvaluationService
): EvaluationResource {
    override fun createEvaluation(evaluationDto: EvaluationDto): ResponseEntity<EvaluationDto> {
        val savedEvaluation = evaluationService.createEvaluation(evaluationDto)
            ?: return ResponseEntity(HttpStatus.BAD_REQUEST)

        return ResponseEntity(savedEvaluation, HttpStatus.CREATED)
    }

    override fun updateEvaluation(evaluationDto: EvaluationDto): ResponseEntity<EvaluationDto> {
        val evaluation = evaluationService.updateEvaluation(evaluationDto)
            ?: return ResponseEntity(HttpStatus.NOT_FOUND)

        return ResponseEntity(evaluation, HttpStatus.OK)
    }

    override fun getEvaluationsForAuthor(authorId: UUID): List<EvaluationWithInfoDto> {
        return evaluationService.getEvaluationsForAuthor(authorId)
    }

    override fun getAllProposalsForReviewer(reviewerId: UUID): List<ProposalDto> {
        return evaluationService.getProposalsForReviewer(reviewerId)
    }
}
