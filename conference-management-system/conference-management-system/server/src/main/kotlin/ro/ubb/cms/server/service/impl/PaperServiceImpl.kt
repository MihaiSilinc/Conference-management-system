package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Service
import org.springframework.util.StringUtils
import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.api.dto.PaperDto
import ro.ubb.cms.server.entity.Paper
import ro.ubb.cms.server.repository.PaperRepository
import ro.ubb.cms.server.service.PaperService
import ro.ubb.cms.server.service.mapper.PaperMapper
import java.lang.Exception
import kotlin.collections.ArrayList


@Service
class PaperServiceImpl(
    @Autowired
    private val paperRepository: PaperRepository,

    @Autowired
    private val paperMapper: PaperMapper

) :PaperService {
    override fun uploadPaper(multipartFile: MultipartFile): Paper {

        val paperName = multipartFile.originalFilename?.let { StringUtils.cleanPath(it) }
        val paperContent = multipartFile.bytes
        val paperSize = multipartFile.size

        paperName?.let {
            val newPaper = Paper(paperName, paperContent, paperSize)
            return paperRepository.save(newPaper)
        }
       throw Exception("Can't upload file")
    }

    override fun downloadPaper(paperName: String): Paper {
        val queryResult = paperRepository.findById(paperName);

        if(!queryResult.isPresent){
            throw Exception("Could not find paper with name: " + paperName)
        }
        val toBeDownloadedPaper = queryResult.get()
        return toBeDownloadedPaper;
    }

    override fun getAllPaperNames(): ArrayList<String> {
        val queryResult = paperRepository.findAll();
        var listOfPaperNames = arrayListOf<String>()

        for (currentPaper: Paper in queryResult){
            listOfPaperNames.add(currentPaper.name);
        }

        return listOfPaperNames;
    }
}
