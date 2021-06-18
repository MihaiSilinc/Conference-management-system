package ro.ubb.cms.server.service.mapper

interface EntityMapper<ENTITY, DTO> {

    fun toEntity(dto: DTO): ENTITY

    fun toDto(entity: ENTITY): DTO
}
