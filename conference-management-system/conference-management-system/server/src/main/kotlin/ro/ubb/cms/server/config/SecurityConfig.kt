package ro.ubb.cms.server.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.BeanIds
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import java.lang.Exception
import java.util.*

@Configuration
@EnableWebSecurity
@ComponentScan("ro.ubb.cms.server")
@EnableGlobalMethodSecurity(prePostEnabled = true)
class SecurityConfig(
    @Autowired
    private val customAuthProvider: CustomAuthenticationProvider
): WebSecurityConfigurerAdapter() {

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.authenticationProvider(customAuthProvider)
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.cors()
            .and()
            .csrf()
            .disable()
            .authorizeRequests()
            .antMatchers(HttpMethod.POST, "/api/authentication/login", "/api/authentication/register")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .httpBasic()
            .and()
            .logout()
            .logoutUrl("/api/authentication/logout")
            .permitAll()
            .clearAuthentication(true)
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val configuration = CorsConfiguration()
        configuration.allowedOriginPatterns = listOf("*")
        configuration.allowedMethods =
            Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "ORIGINS")
        configuration.allowCredentials = true
        configuration.allowedHeaders =
            Arrays.asList("Authorization", "Cache-Control", "Content-Type", "Basic", "Password", "Old", "New")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
    }

    /*
    We use this bean to Expose our Authentication Manager globally,
    so we can access it anywhere in our application.
    */
    @Bean(name = [BeanIds.AUTHENTICATION_MANAGER])
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager? {
        return super.authenticationManagerBean()
    }
}
