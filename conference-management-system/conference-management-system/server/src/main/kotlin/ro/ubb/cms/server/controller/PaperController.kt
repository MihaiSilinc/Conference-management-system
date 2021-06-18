package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.api.dto.PaperDto
import ro.ubb.cms.api.dto.ProposalDto
import ro.ubb.cms.api.resource.PaperResource
import ro.ubb.cms.server.facade.ProposalFacade
import ro.ubb.cms.server.service.PaperService
import ro.ubb.cms.server.service.ProposalService
import java.util.*
import kotlin.collections.ArrayList


@RestController
class PaperController(
    @Autowired
    var paperService: PaperService,

    @Autowired
    var proposalService: ProposalService,

    @Autowired
    var proposalFacade: ProposalFacade
) : PaperResource {
    override fun uploadPaper(proposalName: String, abstractParagraph: String,
                             multipartFile: MultipartFile, conferenceId: UUID, authorId: UUID): ResponseEntity<Unit> {
        val proposal = proposalFacade.createProposal(proposalName, abstractParagraph, multipartFile, conferenceId, authorId)

        proposal?.let {return ResponseEntity(HttpStatus.OK) }
            ?: return ResponseEntity(HttpStatus.BAD_REQUEST)
    }

    override fun getProposalsForConference(conferenceId: UUID): List<ProposalDto> {
        return proposalService.getProposalsByConference(conferenceId)
    }

    override fun downloadPaper(paperName: String): ResponseEntity<ByteArray> {
        return try {
            val toDownloadPaper = paperService.downloadPaper(paperName)
            val httpHeaders = HttpHeaders();

            httpHeaders.add("Paper-Name", toDownloadPaper.name)
            httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment;Paper-Name=" + toDownloadPaper.name)

            return ResponseEntity(toDownloadPaper.content, httpHeaders, HttpStatus.OK)
        } catch (exception: Exception) {
            ResponseEntity(HttpStatus.BAD_REQUEST)
        }
    }

    override fun getAllPaperNames(): ArrayList<String> {
        return paperService.getAllPaperNames();
    }

}
