package com.patrickmoura.dscatalog.services.validation;

import com.patrickmoura.dscatalog.dto.UserUpdateDTO;
import com.patrickmoura.dscatalog.entities.User;
import com.patrickmoura.dscatalog.repositories.UserRepository;
import com.patrickmoura.dscatalog.controllers.exeptions.FieldMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserUpdateValidator implements ConstraintValidator<UserUpdateValid, UserUpdateDTO> {

    @Autowired
    private HttpServletRequest request;
    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize (UserUpdateValid ann){

    }

    @Override
    public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {

        @SuppressWarnings("unchecked")
        var uriVars = (Map<String,String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        long userId = Long.parseLong(uriVars.get("id"));

        List<FieldMessage> list = new ArrayList<>();

        User user = userRepository.findByEmail(dto.getEmail());
        if(user != null && userId != user.getId()){
            list.add(new FieldMessage("email", "Email já Existe"));
        }
        for (FieldMessage e : list) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(e.getMessage()).addPropertyNode(e.getFieldName()).addConstraintViolation();

        }


        return list.isEmpty();
    }
}
