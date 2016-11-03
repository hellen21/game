package cr.fi.hp.game.configuration;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import cr.fi.hp.game.utilities.Utils;
import cr.fi.hp.game.ws.HomeWsClient;
import cr.fi.hp.game.ws.HomeWsClientImpl;

@Configuration
public class BeansContext {



	@Bean
	public Utils util() {
		return new Utils();
	}

	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
		return new EmbeddedServletContainerCustomizer() {
			@Override
			public void customize(ConfigurableEmbeddedServletContainer container) {

				ErrorPage error400Page = new ErrorPage(HttpStatus.BAD_REQUEST, "/errors/templateError.html");
				ErrorPage error401Page = new ErrorPage(HttpStatus.UNAUTHORIZED,	"/errors/templateError.html");
				ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND,"/errors/templateError.html");
				ErrorPage error500Page = new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/errors/templateError.html");			

				container.addErrorPages(error400Page, error401Page, error404Page, error500Page);
			}
		};
	}

	@Bean(name="simpleMappingExceptionResolver")
    public SimpleMappingExceptionResolver exceptionResolver() {
        SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();

        Properties mappings = new Properties();

        mappings.put("java.lang.Exception", "/errors/templateError.html");
        mappings.put("java.lang.RuntimeException", "/errors/templateError.html");
        mappings.put("java.lang.NoClassDefFoundError",  "/errors/templateError.html");
        
        Properties statusCodes = new Properties();
        
        statusCodes.put("error/404", "404");
        statusCodes.put("error/500", "500");  
        exceptionResolver.setStatusCodes(statusCodes);
        exceptionResolver.setExceptionMappings(mappings);  // None by default
        exceptionResolver.setDefaultErrorView("/errors/templateError.html");    // No default
//        exceptionResolver.setExceptionAttribute("ex");     // Default is "exception"
        exceptionResolver.setWarnLogCategory("example.MvcLogger");     // No default
        return exceptionResolver;
    } 
	
	@Bean
	public MessageSource messageSource() {

		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasenames("classpath:messages_es");
		messageSource.setUseCodeAsDefaultMessage(true);
		messageSource.setDefaultEncoding("UTF-8");
		messageSource.setCacheSeconds(0);
		return messageSource;
	}
	@Bean
	 public ObjectMapper objectMapperProvider() {
	  
	  ObjectMapper mapper = new ObjectMapper();
	        /*
	         * This allows the ObjectMapper to accept single values for a collection.
	         * For example: "location" property in the returned JSON is a collection that 
	         * can accept multiple objects but, in deserialization process, this property just 
	         * have one object and causes an Exception.
	         */
	  mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
	        
	  /* 
	         * If some JSON property is not present, avoid exceptions setting
	         * FAIL_ON_UNKNOWN_PROPERTIES to false 
	         */
	  mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

	  return mapper;
	 }
	
	@Bean
	 public RestTemplate restTemplate() {
		  RestTemplate restTemplate = new RestTemplate(clientHttpRequestFactory());

		  List<ClientHttpRequestInterceptor> interceptors = new ArrayList<ClientHttpRequestInterceptor>();
		  interceptors.add(new RequestInterceptor());
		  restTemplate.setInterceptors(interceptors);
		  MappingJackson2HttpMessageConverter converter = (MappingJackson2HttpMessageConverter) restTemplate.getMessageConverters().get(6);
		  StringHttpMessageConverter stringConverter= new StringHttpMessageConverter(Charset.forName("UTF-8"));
		   stringConverter.setWriteAcceptCharset(false);
		   restTemplate.getMessageConverters().add(0, stringConverter);
		   converter.setObjectMapper(objectMapperProvider());
		  return restTemplate;
	 }
	
	
	
	private ClientHttpRequestFactory clientHttpRequestFactory() {
		  HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		     factory.setReadTimeout(30000);
		     factory.setConnectTimeout(30000);
		     return factory;
	}
	
	
	

}