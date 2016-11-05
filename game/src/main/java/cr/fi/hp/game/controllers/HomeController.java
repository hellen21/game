package cr.fi.hp.game.controllers;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import cr.fi.hp.game.entities.Championship;
import cr.fi.hp.game.entities.Player;
import cr.fi.hp.game.utilities.Constant;
import cr.fi.hp.game.utilities.Utils;
import cr.fi.hp.game.utilities.WsClientUtilities;


@Controller
public class HomeController{

	@Autowired
	Utils util;
	
	@Autowired
	WsClientUtilities wsClientUtilities;
	
	public static String contextPath;

	private static final String READ_FILE = "/readText";
	private static final String WIN_PLAYER= "/winPlayer";
	private static final String WIN_CHAMPIONS_PLAYER= "/winChampionsPlayer";
	
	
	@RequestMapping(value = "/")
	public String home(Model model,HttpServletResponse response,HttpServletRequest request){
//		List<Player> players = new ArrayList<Player>();
//		Player player1= new Player("hellen", "S");
//		Player player2= new Player("Carlos", "R");
//		players.add(player1);
//		players.add(player2);
//		List<Player> players2 = new ArrayList<Player>();
//		Player player3= new Player("Juan", "S");
//		Player player4= new Player("Rafa", "R");
//		players2.add(player3);
//		players2.add(player4);
		
		Vector<ArrayList<Player>> listPlayers=new Vector<ArrayList<Player>>();
		listPlayers.add(Constant.listGroup1);
		listPlayers.add(Constant.listGroup2);
		Championship championship = new Championship();
		championship.setChampionship(listPlayers);
		ArrayList<Championship> listChampionship = new ArrayList<Championship>();
		listChampionship.add(championship);
		if (!listChampionship.isEmpty()) {
			wsClientUtilities.searchWinChampions(listChampionship);
		}
		
		if(listPlayers.size()>0){
			 for(int i = 0; i < listPlayers.size(); i++){
				// System.out.print(listPlayers.elementAt(i)+"\t");
				 ArrayList<Player> temp = listPlayers.elementAt(i);
				 if(temp.size()==2){
					 if(wsClientUtilities.validateStrategy(temp)){
						 Player winPlayer = wsClientUtilities.searchWin(temp);
						 System.out.println("Juego sencillo, Gano el jugador "+winPlayer.getName());
					 }
					 else{
						 System.out.println("la estrategia de algun jugador es erronea");
					 }
				 }
				 else{
					 System.out.println("Deben de ser 2 jugadores");
				 }
				 
		     }
		}
//		if(players.size()!=2){
//			System.out.println("Deben de ser 2 jugadores");
//		}
//		if(validateStrategy(players)){
//			Player winPlayer = searchWin(players);
//			System.out.println("gano el jugador"+winPlayer.getName());
//		}else{
//			System.out.println("la estrategia de algun jugador es erronea");
//		}
		return "home";
	}
	
	@RequestMapping(value = READ_FILE, method = RequestMethod.GET)
	public @ResponseBody boolean getFiles(@RequestParam(value = "text") String text, HttpServletResponse response,HttpServletRequest request) throws JsonParseException, JsonMappingException, IOException{
		text=text.replaceAll("\\s","");
		
		ObjectMapper mapper = new ObjectMapper();	
		String parameterValues = request.getParameter("text"); 
		Object[] listSimpleGame = mapper.readValue(parameterValues, Object[].class);
//		ArrayList<Player> ls = (ArrayList<Player>) listSimpleGame;
		Player[][] prueba = (Player[][]) listSimpleGame;
		System.out.println(text);
		
	    return true;
	}
	
	@RequestMapping(value = WIN_PLAYER, method = RequestMethod.POST)
	public @ResponseBody Object winSimpleGame(HttpServletResponse response,HttpServletRequest request) throws JsonParseException, JsonMappingException, IOException{
		ObjectMapper mapper = new ObjectMapper();	
		String[] parameterValues = request.getParameterValues("listPlayer"); 
		Player[] listSimpleGame = mapper.readValue(parameterValues[0], Player[].class);
		if (listSimpleGame != null) {
			if(wsClientUtilities.validateStrategy(listSimpleGame)){
				 Player winPlayer = wsClientUtilities.searchWin(listSimpleGame);
				 return winPlayer;
			 }
			 else{
				 return "A player's strategy is wrong";
			 }
		}
		return "A player's strategy is wrong";
	}
	
	@RequestMapping(value = WIN_CHAMPIONS_PLAYER, method = RequestMethod.POST)
	public @ResponseBody Object winChampionsGame(HttpServletResponse response,HttpServletRequest request) throws JsonParseException, JsonMappingException, IOException{
		
		ArrayList<Player> tempPlayer = new ArrayList<Player>();
		ArrayList<Player> tempChampions = new ArrayList<Player>();
		
		ObjectMapper mapper = new ObjectMapper();	
		
		String[] tournamentValues = request.getParameterValues("tournament"); 
		String[] championsValue = request.getParameterValues("champions"); 
		
		if(tournamentValues.length != 0){
			try {
				Player[][] tournamentList = mapper.readValue(tournamentValues[0], Player[][].class); 
				if(tournamentList.length != 0){
					for(int x = 0; x < tournamentList.length; x++){
						Player[] playerTemp = tournamentList[x];
						if(wsClientUtilities.validateStrategy(playerTemp)){
							 Player winPlayer = wsClientUtilities.searchWin(playerTemp);
							 if(tournamentList.length==1){
								 return winPlayer;
							 }
							 tempPlayer.add(winPlayer);
						 }
						 else{
							 return "A player's strategy is wrong";
						 }
					}
				}
				if(tempPlayer.size()==2){
					 if(wsClientUtilities.validateStrategy(tempPlayer)){
						 Player winPlayer = wsClientUtilities.searchWin(tempPlayer);
						 return winPlayer;
					 }
					 else{
						 System.out.println("A player's strategy is wrong");
					 }
				}
				else{
					if(tempPlayer.size() != 0){
						return wsClientUtilities.functionRecursive(tempPlayer);
					}
					
				}
				
			} catch (Exception e) {
				// TODO: handle exception
			}
			
		}
		if(championsValue.length != 0){
			Player[][][] championsList = mapper.readValue(championsValue[0], Player[][][].class);
			if(championsList.length != 1){
				for(int x = 0; x < championsList.length; x++){
					Player[][] playerTemp1 = championsList[x];
					if(playerTemp1.length != 0){
						for(int i = 0; i < playerTemp1.length; i++){
							Player[] playerTemp = playerTemp1[i];
							if(wsClientUtilities.validateStrategy(playerTemp)){
								 Player winPlayer = wsClientUtilities.searchWin(playerTemp);
								 tempPlayer.add(winPlayer);
							 }
							 else{
								 return "A player's strategy is wrong";
							 }
						}
					}
				}
			}
			tempChampions = wsClientUtilities.searchWinners(tempPlayer);
			if(tempChampions.size()==2){
				 if(wsClientUtilities.validateStrategy(tempChampions)){
					 Player winPlayer = wsClientUtilities.searchWin(tempChampions);
					 return winPlayer;
				 }
				 else{
					 System.out.println("A player's strategy is wrong");
				 }
			}else{
				return wsClientUtilities.functionRecursive(tempChampions);
			}
			
		} 
		return "A player's strategy is wrong";
	}
}

