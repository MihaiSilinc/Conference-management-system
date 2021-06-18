package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.api.dto.PaperDto
import ro.ubb.cms.api.dto.ProposalDto
import java.util.*
import kotlin.collections.ArrayList

@Api(value = "PaperResource")
@RequestMapping(value = ["/api/paper"])
interface PaperResource {
    @ApiOperation(hidden = true, value = "Upload paper")
    @PostMapping(value = ["/upload"], consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadPaper(
        @RequestParam("name") proposalName: String,
        @RequestParam("abstract") abstractParagraph: String,
        @RequestParam("paper") multipartFile: MultipartFile,
        @RequestParam("conferenceId") conferenceId: UUID,
        @RequestParam("authorId") authorId: UUID
    ): ResponseEntity<Unit>

    @GetMapping("/{conferenceId}")
    fun getProposalsForConference(@PathVariable conferenceId: UUID): List<ProposalDto>


    @GetMapping("/download", produces = arrayOf("application/json"))
    @ResponseBody fun downloadPaper(@RequestParam("paperName") paperName: String): ResponseEntity<ByteArray>

    @GetMapping("/getNames")
    fun getAllPaperNames(): ArrayList<String>
}
