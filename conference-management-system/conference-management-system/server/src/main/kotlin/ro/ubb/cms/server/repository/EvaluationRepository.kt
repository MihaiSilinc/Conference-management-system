package ro.ubb.cms.server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import ro.ubb.cms.server.entity.Evaluation
import ro.ubb.cms.server.entity.key.EvaluationKey
import java.util.*

interface EvaluationRepository: JpaRepository<Evaluation, EvaluationKey> {
    fun getAllByKey_PcMemberIdAndAndEvaluationScoreNull(reviewerId: UUID): List<Evaluation>

    fun getAllByProposalAuthorId(authorId: UUID): List<Evaluation>
}
