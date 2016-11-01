
package cr.fi.hp.game.ws;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.web.client.RestTemplate;

import cr.fi.hp.game.utilities.Utils;
import cr.fi.hp.game.utilities.WsClientUtilities;
import cr.fi.hp.game.utilities.WsClientUtilitiesImpl;
import groovy.util.logging.Log4j;


/**
 * Implementation class for home web service requests handler 
 * @author cvargas-as Avantica Technologies
 */
@Log4j
public class HomeWsClientImpl implements HomeWsClient{	
	
	Logger fileLog = Logger.getLogger("file");
	Utils utils = new Utils();
	
	
	private WsClientUtilities wsClientUtilities = new WsClientUtilitiesImpl();
	
	@Value("${mutualapp.wserviceurl}")
	private String WS_SERVICES_URL;
	
	protected static final String CONSULT_TYPE_RATE_CHANGE = "v11:ConsultarTasaCambioMsjSolTipo"; 
	@Value("${mutualapp.endPointMoney}")
	protected String END_POINT;
	
	protected static final String NAMESPACES =  "\"@xmlns:v11\": \"http://xmlns.grupomutual.fi.cr/ObjetoEmpresarial/DominioProducto/Producto/V1\","; 
		
	private String currentDate;
	
	private HttpEntity<String> restRequest;
	
	@Autowired
	private RestTemplate restRequestTemplate;
	

	
	
}
