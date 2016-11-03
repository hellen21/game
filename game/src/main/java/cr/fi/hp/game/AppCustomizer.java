package cr.fi.hp.game;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.http.HttpStatus;

public class AppCustomizer implements EmbeddedServletContainerCustomizer {

	private static final String INTERNAL_ERROR_PAGE = "/error/notfound"; // 500
	private static final String NOT_FOUND_ERROR_PAGE = "/error/notfound"; // 404
	private static final String METHOD_NOT_ALLOWED_ERROR_PAGE = "/error/notfound"; // 405
	private static final String BAD_REQUEST_ERROR_PAGE = "/error/notfound"; // 400

	@Override
	public void customize(ConfigurableEmbeddedServletContainer factory) {

		factory.addErrorPages(new ErrorPage(HttpStatus.BAD_REQUEST, BAD_REQUEST_ERROR_PAGE));
		factory.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, INTERNAL_ERROR_PAGE));
		factory.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, NOT_FOUND_ERROR_PAGE));
		factory.addErrorPages(new ErrorPage(HttpStatus.METHOD_NOT_ALLOWED, METHOD_NOT_ALLOWED_ERROR_PAGE));
	}
}