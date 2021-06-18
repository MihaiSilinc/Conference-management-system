package ro.ubb.cms.api.dto

import ro.ubb.cms.api.enum.EvaluationScore
import java.util.*

class EvaluationDto(
    var pcMemberId: UUID,
    var proposalId: UUID,
    var evaluationScore: EvaluationScore?,
    var recommendation: String?
)
