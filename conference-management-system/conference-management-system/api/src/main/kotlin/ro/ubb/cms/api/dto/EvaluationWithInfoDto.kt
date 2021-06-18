package ro.ubb.cms.api.dto

import ro.ubb.cms.api.enum.EvaluationScore

class EvaluationWithInfoDto (
    var proposalName: String,
    var reviewerName: String,
    var evaluationScore: EvaluationScore?,
    var recommendation: String?
)
