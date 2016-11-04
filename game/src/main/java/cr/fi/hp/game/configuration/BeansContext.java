package cr.fi.hp.game.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import cr.fi.hp.game.utilities.Utils;

@Configuration
public class BeansContext {



	@Bean
	public Utils util() {
		return new Utils();
	}
}
