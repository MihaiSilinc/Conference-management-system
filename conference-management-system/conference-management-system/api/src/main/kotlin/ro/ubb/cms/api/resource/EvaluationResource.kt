package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.EvaluationDto
import ro.ubb.cms.api.dto.EvaluationWithInfoDto
import ro.ubb.cms.api.dto.ProposalDto
import java.util.*

@Api(value = "Evaluation")
@RequestMapping(value = ["/api/evaluate"])
interface EvaluationResource {

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = ["/create"])
    fun createEvaluation(@RequestBody evaluationDto: EvaluationDto): ResponseEntity<EvaluationDto>

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping(value = ["/update"])
    fun updateEvaluation(@RequestBody evaluationDto: EvaluationDto): ResponseEntity<EvaluationDto>

    @PreAuthorize("hasAuthority('AUTHOR')")
    @GetMapping(value = ["/for-author/{authorId}"])
    fun getEvaluationsForAuthor(@PathVariable authorId: UUID): List<EvaluationWithInfoDto>

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = ["/proposals-to-review/{reviewerId}"])
    fun getAllProposalsForReviewer(@PathVariable reviewerId: UUID): List<ProposalDto>
}
