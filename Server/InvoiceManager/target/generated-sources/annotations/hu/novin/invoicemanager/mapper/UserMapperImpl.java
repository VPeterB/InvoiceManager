package hu.novin.invoicemanager.mapper;

import hu.novin.invoicemanager.dto.UserDTO;
import hu.novin.invoicemanager.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-12T19:57:06+0100",
    comments = "version: 1.5.0.Final, compiler: javac, environment: Java 17.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDTO toUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setName( user.getName() );
        userDTO.setUsername( user.getUsername() );
        userDTO.setEntryDate( user.getEntryDate() );
        userDTO.setRoles( mapRolesToStrings( user.getRoles() ) );

        getRoles( userDTO, user );

        return userDTO;
    }
}
