package com.patrickmoura.dscatalog.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
public class DscatalogProperties {



    @Value("${security.oauth2.client.client-id}")
    private String clientIdOauth2;

    @Value("${security.oauth2.client.client-secret}")
    private  String clientSecretOauth2;

    @Value("${banco.inter.grant.type}")
    private String grantType;
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.duration}")
    private Integer jwtDuration;

    @Value("${cors.origins}")
    private String corsOrigins;
}
