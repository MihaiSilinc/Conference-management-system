package ro.ubb.cms.server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import ro.ubb.cms.server.entity.Proposal
import java.util.*

interface ProposalRepository : JpaRepository<Proposal, UUID> {
    @Query(value = "select distinct p from Proposal p left join fetch p.reviews where p.conference.id = :confId")
    fun findAllWithReviewersForConference(@Param("confId") conferenceId: UUID): List<Proposal>
}
