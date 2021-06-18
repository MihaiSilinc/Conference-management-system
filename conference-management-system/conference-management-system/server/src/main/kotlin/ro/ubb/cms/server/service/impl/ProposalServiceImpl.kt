package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.ProposalDto
import ro.ubb.cms.server.entity.*
import ro.ubb.cms.server.repository.ProposalRepository
import ro.ubb.cms.server.service.ProposalService
import ro.ubb.cms.server.service.mapper.UserMapper
import java.util.*

@Service
class ProposalServiceImpl(
    @Autowired
    var repository: ProposalRepository,

    @Autowired
    var userMapper: UserMapper
) : ProposalService {
    override fun createProposal(name: String, abstractParagraph: String, paper: Paper,
                                conference: Conference, author: Author): Proposal? {
        val proposal = Proposal(name, paper, abstractParagraph, conference, author, emptySet())
        return try {
            repository.save(proposal)
        } catch (e: DataIntegrityViolationException) {
            null
        }
    }

    override fun getProposalsByConference(conferenceId: UUID): List<ProposalDto> {
        return repository.findAllWithReviewersForConference(conferenceId)
            .map { ProposalDto(
                id = it.id.toString(),
                name = it.name,
                abstractParagraph = it.abstractParagraph,
                paperName = it.paper.name,
                authorName = it.author.firstName + " " + it.author.lastName,
                conferenceId = it.conference.id.toString(),
                reviewers = it.reviews.map { review -> userMapper.toDto(review.pcMember!!) }
            ) }
    }
}
