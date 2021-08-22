package com.patrickmoura.dscatalog.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

import java.util.Arrays;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    private Environment env;

    private static final String[] PUBLIC = {"/oauth/token","/h2-console/**"};

    private static final String[] OPERATOR_OR_ADMIM = {"/products/**","/categories/**"};

    private static final String[] ADMIM = {"/users/**"};

    @Autowired
    private JwtTokenStore jwtTokenStore;

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
    resources.tokenStore(jwtTokenStore);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        //H2-CONSOLE
        if(Arrays.asList(env.getActiveProfiles()).contains("test")){
        http.headers().frameOptions().disable();

        }
        http.authorizeRequests()
                .antMatchers(PUBLIC).permitAll()
                .antMatchers(HttpMethod.GET,OPERATOR_OR_ADMIM).permitAll()
                .antMatchers(OPERATOR_OR_ADMIM).hasAnyRole("OPERATOR","ADMIM")
                .antMatchers(ADMIM).hasRole("ADMIM")
                .anyRequest().authenticated();
    }
}
