package ro.ubb.cms.server.service.mapper

import org.springframework.stereotype.Component
import ro.ubb.cms.api.dto.PaperDto
import ro.ubb.cms.server.entity.Paper

@Component
class PaperMapper: EntityMapper<Paper, PaperDto> {
    override fun toEntity(dto: PaperDto): Paper {
        TODO("Not yet implemented")
    }

    override fun toDto(entity: Paper): PaperDto {
        return PaperDto(
            entity.name,
            entity.size,
            entity.content
        )
    }
}
