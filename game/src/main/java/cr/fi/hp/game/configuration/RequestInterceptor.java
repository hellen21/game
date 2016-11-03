package cr.fi.hp.game.configuration;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;;

@Configuration
public class RequestInterceptor implements ClientHttpRequestInterceptor {

   

    @Override
    public ClientHttpResponse intercept(final HttpRequest request, final byte[] body,
            final ClientHttpRequestExecution execution) throws IOException {
      
    	request.getHeaders().set("Accept-Charset", "ISO-8859-1");
//    	System.out.println(request.getURI());
//    	System.out.println(request.getHeaders());
//    	System.out.println(body.toString());
//    	System.out.println("..............................");
    	
    	ClientHttpResponse response = execution.execute(request, body);

    
        return response;
    }

   

}