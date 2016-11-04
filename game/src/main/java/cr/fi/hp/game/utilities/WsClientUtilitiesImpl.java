package cr.fi.hp.game.utilities;

import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

import org.springframework.stereotype.Service;

import cr.fi.hp.game.entities.Championship;
import cr.fi.hp.game.entities.Player;

@Service
public class WsClientUtilitiesImpl implements WsClientUtilities {

	Utils utils = new Utils();

	public Player searchWin(List<Player> players) {
		String strategyPlayer1 = players.get(0).getStrategy();
		String strategyPlayer2 = players.get(1).getStrategy();
		if (strategyPlayer1.equalsIgnoreCase(strategyPlayer2)) {
			return players.get(0);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.ROCK) && strategyPlayer2.equalsIgnoreCase(Constant.PAPER)) {
			return players.get(1);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.ROCK) && strategyPlayer2.equalsIgnoreCase(Constant.SCISSORS)) {
			return players.get(0);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.PAPER) && strategyPlayer2.equalsIgnoreCase(Constant.SCISSORS)) {
			return players.get(1);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.PAPER) && strategyPlayer2.equalsIgnoreCase(Constant.ROCK)) {
			return players.get(0);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.SCISSORS) && strategyPlayer2.equalsIgnoreCase(Constant.ROCK)) {
			return players.get(1);
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.SCISSORS) && strategyPlayer2.equalsIgnoreCase(Constant.PAPER)) {
			return players.get(0);
		}
		return null;
	}

	public Player searchWin(Player[] players) {
		String strategyPlayer1 = players[0].getStrategy();
		String strategyPlayer2 = players[1].getStrategy();
		if (strategyPlayer1.equalsIgnoreCase(strategyPlayer2)) {
			return players[0];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.ROCK) && strategyPlayer2.equalsIgnoreCase(Constant.PAPER)) {
			return players[1];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.ROCK) && strategyPlayer2.equalsIgnoreCase(Constant.SCISSORS)) {
			return players[0];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.PAPER) && strategyPlayer2.equalsIgnoreCase(Constant.SCISSORS)) {
			return players[1];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.PAPER) && strategyPlayer2.equalsIgnoreCase(Constant.ROCK)) {
			return players[0];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.SCISSORS) && strategyPlayer2.equalsIgnoreCase(Constant.ROCK)) {
			return players[1];
		} else if (strategyPlayer1.equalsIgnoreCase(Constant.SCISSORS) && strategyPlayer2.equalsIgnoreCase(Constant.PAPER)) {
			return players[0];
		}
		return null;
	}
	public boolean validateStrategy(ArrayList<Player> players) {
		for (Player player : players) {
			if (player.getStrategy().equalsIgnoreCase(Constant.SCISSORS) || player.getStrategy().equalsIgnoreCase(Constant.ROCK)
					|| player.getStrategy().equals(Constant.PAPER)) {
			} else {
				return false;
			}
		}
		return true;
	}

	public boolean validateStrategy(Player[] players) {
		for (Player player : players) {
			if (player.getStrategy().equalsIgnoreCase(Constant.SCISSORS) || player.getStrategy().equalsIgnoreCase(Constant.ROCK)
					|| player.getStrategy().equals(Constant.PAPER)) {
			} else {
				return false;
			}
		}
		return true;
	}

	
	public Player searchWinChampions(ArrayList<Championship> listChampions) {
		Player championsWinPlayer = new Player();
		System.out.println("Torneo");
		ArrayList<Player> championsListTempPlayer = new ArrayList<Player>();
		if (!listChampions.isEmpty()) {
			for (int cont = 0; cont < listChampions.size(); cont++) {
				Championship element = listChampions.get(cont);
				Vector<ArrayList<Player>> champions = element.getChampionship();
				if (champions.size() > 0) {
					for (int i = 0; i < champions.size(); i++) {
						// System.out.print(listPlayers.elementAt(i)+"\t");
						ArrayList<Player> temp = champions.elementAt(i);
						if (temp.size() == 2) {
							System.out.println("Jugador 1 " + temp.get(0).getName() + " con la estrategia de juego " + temp.get(0).getStrategy());
							System.out.println("Jugador 2 " + temp.get(1).getName() + " con la estrategia de juego " + temp.get(1).getStrategy()); 
							if (validateStrategy(temp)) {
								Player winPlayer = searchWin(temp);
								System.out.println("Ronda ganada por " + winPlayer.getName() + " con la estrategia de juego " + winPlayer.getStrategy()); 
								championsListTempPlayer.add(winPlayer);
							} else {
								System.out.println("la estrategia de algun jugador es erronea");
							}
						} else {
							System.out.println("Deben de ser 2 jugadores");
						}

					}
				}
			}
		}
		if(championsListTempPlayer.size()>1){
			
			if(championsListTempPlayer.size()%2 == 0){
				Player win = winChampions(championsListTempPlayer);
				System.out.println("El torneo es fue ganado por " + win.getName() + " Felicidades");
			}else{
				System.out.println("El torneo es invalido");
			}
			
		}
		return null;

	}
	
	
	
	public Player winChampions(ArrayList<Player> championsListTempPlayer ){
		ArrayList<Player> playerList = new ArrayList<Player>();
		Player playerWin = new Player();
		for (int cont= 0; cont < championsListTempPlayer.size(); cont+=2) {
			
			if (championsListTempPlayer.size() == 2) {
				if (validateStrategy(championsListTempPlayer)) {
					Player winPlayer = searchWin(championsListTempPlayer);
					playerList.add(winPlayer);
				} else {
					System.out.println("la estrategia de algun jugador es erronea");
				}
			} else {
				System.out.println("Deben de ser 2 jugadores");
			}
		}
		if(playerList.size() == 1){
			return playerList.get(0);
		}
		return playerWin;
		
	}

}
