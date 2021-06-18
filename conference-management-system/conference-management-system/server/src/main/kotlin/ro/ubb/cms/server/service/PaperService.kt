package ro.ubb.cms.server.service

import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.api.dto.PaperDto
import ro.ubb.cms.server.entity.Paper

interface PaperService {
    fun uploadPaper(multipartFile: MultipartFile): Paper
    fun downloadPaper(paperName: String): Paper
    fun getAllPaperNames(): ArrayList<String>
}
