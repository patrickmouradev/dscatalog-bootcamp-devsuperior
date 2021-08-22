package com.patrickmoura.dscatalog.dto;

import com.patrickmoura.dscatalog.entities.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;

    public CategoryDTO(@org.jetbrains.annotations.NotNull Category entity) {
        this.id = entity.getId();
        this.name = entity.getName();
    }

}
